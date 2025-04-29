import {ChangeEvent, useEffect, useState} from 'react';
import Board from '../components/Board.tsx';
import Keyboard from '../components/Keyboard.tsx';
import {LETTERS} from '../utility/constants.ts';
import {ARCHIVE_PAGE_ROUTE} from '../utility/routes.ts';
import {useNavigate, useParams} from 'react-router-dom';

export default function GamePage(){
    // State Variables
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [word, setWord] = useState('');
    const [length, setLength] = useState(7);
    const [guesses, setGuesses] = useState([]);
    
    // Methods/Handlers
    function handleGuess(): void {
        setWord('');
    }
    
    // Effects
    useEffect(() => {
        if(!id) navigate(ARCHIVE_PAGE_ROUTE);
        else{
            // getGameData(id);
        }
    }, [id, navigate]);
    
    // Render
    return (
        <div className="h-auto bg-black pt-2 pb-2">
            <Board word={word} length={length} guesses={guesses} />
            
            <Keyboard word={word} setWord={setWord} submit={() => handleGuess()} />
            
            <input id="hidden-input"
                   type="text"
                   value={word}
                   autoFocus
                   className="opacity-0 absolute right-0 top-0 w-0"
                   maxLength={length}
                   autoComplete="off"
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       const value: string = event.target.value;
                       
                       if(value.length <= word.length){
                           setWord(word.slice(0, -1));
                           return;
                       }
                       
                       const final: string = value.slice(-1);
                       if(final === 'N') setWord(word + 'Ñ');
                       else if(LETTERS.flat().includes(final.toUpperCase())) setWord(word + final.toUpperCase());
                   }}
                   onBlur={(event) => {
                       event.target.focus();
                   }}
                   onKeyDown={(event) => {
                       if(event.key === 'Enter'){
                           handleGuess();
                       }
                   }}
            />
        </div>
    );
}