import {ChangeEvent, useEffect, useState} from 'react';
import Board from '../components/Board.tsx';
import Keyboard from '../components/Keyboard.tsx';
import {States, Word} from '../utility/types.ts';
import {ARCHIVE_PAGE_ROUTE} from '../utility/routes.ts';
import {useNavigate, useParams} from 'react-router-dom';

export default function GamePage(){
    // State Variables
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [word, setWord] = useState('');
    const [length, setLength] = useState(7);
    
    const aWord: Word = {
        word: "lakasan",
        length: length,
        correctness: [States.CORRECT, States.PRESENT, States.WRONG, States.PRESENT, States.WRONG]
    };
    
    const [guesses, setGuesses] = useState([aWord]);
    
    // Methods/Handlers
    function handleGuess(id: string | number | undefined, word: string): void {
        console.log("MARI", id, word);
    }
    handleGuess(id, "");
    
    // Effects
    useEffect(() => {
        if(!id) navigate(ARCHIVE_PAGE_ROUTE);
        else{
            // getGameData(id);
        }
    }, [id, navigate]);
    
    // Render
    return (
        <div className="h-auto bg-black">
            <Board word={word} length={length} guesses={guesses} />
            
            <Keyboard word={word} setWord={setWord} />
            
            <input id="hidden-input"
                   value={word}
                   autoFocus
                   className="opacity-0 absolute left-0 top-0"
                   maxLength={length}
                   autoComplete="off"
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       setWord(event.target.value);
                   }}
                   onBlur={(event: FocusEvent<HTMLInputElement, Element>) => {
                       event.target.focus();
                   }}
            />
        </div>
    );
}