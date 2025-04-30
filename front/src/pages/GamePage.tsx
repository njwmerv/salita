import {ChangeEvent, useEffect, useState} from 'react';
import Board from '../components/Board.tsx';
import {States} from '../utility/types.ts';
import Keyboard from '../components/Keyboard.tsx';
import {LETTERS} from '../utility/constants.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {ARCHIVE_PAGE_ROUTE, GAME_START_MAPPING, DAY_ID_PARAM, GAME_GUESS_MAPPING, WORD_PARAM} from '../utility/routes.ts';

export default function GamePage(){
    // State Variables
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [word, setWord] = useState('');
    const [length, setLength] = useState(5);
    const [guesses, setGuesses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    // Methods/Handlers
    async function getGameData(): Promise<object> {
        const url: string = GAME_START_MAPPING +
            `?${DAY_ID_PARAM}=${id}`;
        try{
            const response: Response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                navigate(ARCHIVE_PAGE_ROUTE);
            }
            return await response.json();
        }
        catch(error){
            console.log("Failed to load game data, redirecting to Archive Page");
            navigate(ARCHIVE_PAGE_ROUTE);
        }
        
    }
    
    async function handleGuess(): Promise<object> {
        const url: string = GAME_GUESS_MAPPING +
            `?${DAY_ID_PARAM}=${id}&${WORD_PARAM}=${word}`;
        try{
            const response: Response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error();
            }
            const json: object = await response.json();
            if(json.valid){
                setWord('');
                setGuesses([...guesses, json]);
                setIsOpen(didWin(json.correctness));
            }
            else{
                console.log("Word not found in word list.");
            }
        }
        catch(error){
            console.log("Failed to submit guess");
        }
    }
    
    function didWin(correctness: States[]): boolean {
        for(const state of correctness){
            if(state !== States.CORRECT) return false;
        }
        return true;
    }
    
    // Effects
    useEffect(() => {
        if(!id) navigate(ARCHIVE_PAGE_ROUTE);
        else{
            getGameData().then((value) => {
                setLength(value.length);
                if(value.previousGuesses) setGuesses(value.previousGuesses);
            });
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
                       if(event.key === 'Enter' && word.length === length){
                           handleGuess();
                       }
                   }}
            />
        </div>
    );
}