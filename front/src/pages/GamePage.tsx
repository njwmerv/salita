import {ChangeEvent, useEffect, useState} from 'react';
import Board from '../components/Board.tsx';
import Keyboard from '../components/Keyboard.tsx';
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
                   className="opacity-0 absolute left-0 top-0"
                   maxLength={length}
                   autoComplete="off"
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       setWord(event.target.value);
                   }}
                   onBlur={(event: FocusEvent<HTMLInputElement, Element>) => {
                       event.target.focus();
                   }}
                   onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                       if(event.key === 'Enter'){
                           handleGuess();
                       }
                   }}
            />
        </div>
    );
}