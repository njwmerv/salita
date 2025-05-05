import {ChangeEvent, useEffect, useState} from 'react';
import Board from '../components/Board.tsx';
import Modal from '../components/Modal.tsx';
import words from '../tagalog_words.json';
import Keyboard from '../components/Keyboard.tsx';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {LETTERS, MAX_GUESSES} from '../utility/constants.ts';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import {useNavigate, useParams} from 'react-router-dom';
import {GameDTO, States, Word, WordDTO} from '../utility/types.ts';
import {ARCHIVE_PAGE_ROUTE, GAME_START_MAPPING, DAY_ID_PARAM, GAME_GUESS_MAPPING, WORD_PARAM} from '../utility/routes.ts';

export default function GamePage(){
    // State Variables
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [won, setWon] = useState(false);
    const [word, setWord] = useState('');
    const [length, setLength] = useState(7);
    const [guesses, setGuesses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    const disabled: boolean = guesses.length > 0 ?
        guesses.length >= MAX_GUESSES || didWin(guesses[guesses.length - 1].correctness) : false;
    
    // Methods/Handlers
    async function getGameData(): Promise<GameDTO> {
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
    
    async function handleGuess(): Promise<WordDTO> {
        if(!words.includes(word.toUpperCase())) {
            return;
        }
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
            const json: WordDTO = await response.json();
            if(json.valid){
                setWord('');
                const newGuesses: Word[] = [...guesses, json];
                const willWin: boolean = didWin(json.correctness);
                setWon(willWin);
                setIsOpen(willWin || newGuesses.length >= MAX_GUESSES);
                setGuesses(newGuesses);
            }
            else{
                console.log("Word not found in word list.");
            }
            return json;
        }
        catch(error){
            console.log("Failed to submit guess");
        }
    }
    
    function didWin(correctness: States[]): boolean {
        for(const state: States of correctness){
            if(state !== States.CORRECT) return false;
        }
        return true;
    }
    
    function renderGuesses(index: number){
        let result: string = "";
        for(const state of guesses[index].correctness){
            switch(state){
                case States.CORRECT:
                    result += "🟩";
                    break;
                case States.PRESENT:
                    result += "🟨";
                    break;
                case States.WRONG:
                    result += "⬛";
                    break;
            }
        }
        return result;
    }
    
    function guessesToString(): string {
        let result: string = "Salita Results\n";
        for(const guess of guesses){
            for(const state of guess.correctness){
                switch(state){
                    case States.CORRECT:
                        result += "🟩";
                        break;
                    case States.PRESENT:
                        result += "🟨";
                        break;
                    case States.WRONG:
                        result += "⬛";
                        break;
                }
            }
            result += "\n";
        }
        result += `${guesses.length}/${MAX_GUESSES} attempts!`;
        return result;
    }
    
    // Effects
    useEffect(() => {
        if(!id) navigate(ARCHIVE_PAGE_ROUTE);
        else{
            setWord('');
            getGameData().then((value: GameDTO) => {
                setLength(value.length);
                if(value.previousGuesses) setGuesses(value.previousGuesses);
                else setGuesses([]);
            });
        }
    }, [id, navigate]);
    
    // Render
    return (
        <div className="w-full min-w-fit h-[calc(100dvh-theme(spacing.16))] sm:pt-2 sm:pb-2 flex flex-col align-middle items-center-safe bg-black">
            <Board word={word}
                   length={length}
                   guesses={guesses}
            />
            
            <Keyboard word={word}
                      submit={() => handleGuess()}
                      setWord={setWord}
                      disabled={disabled}
            />
            
            <input id="hidden-input"
                   type="text"
                   value={word}
                   autoFocus
                   className="opacity-0 absolute left-0 bottom-0 w-0"
                   maxLength={length}
                   autoComplete="off"
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       if(disabled) return;
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
                       if(disabled) return;
                       if(event.key === 'Enter' && word.length === length){
                           handleGuess();
                       }
                   }}
            />
            
            <Modal isOpen={isOpen}>
                <div className="relative flex flex-col bg-white rounded-2xl w-md items-center p-4 gap-2">
                    {won ?
                        <WinModal guesses={guesses} />
                        :
                        <LoseModal guesses={guesses} />
                    }
                    
                    <div>
                        {guesses.map((value: Word, index: number) => {
                            return <p key={`result-${index}`}>{renderGuesses(index)}</p>;
                        })}
                    </div>
                    
                    
                    <button className="flex flex-row align-middle items-center w-fit h-12 p-2 gap-2 bg-amber-300 rounded-2xl hover:cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(guessesToString())}>
                        <p>Copy Result</p>
                        
                        <ContentCopyRoundedIcon />
                    </button>
                    
                    <button className="absolute top-4 right-4 w-fit h-fit hover:cursor-pointer"
                            onClick={() => setIsOpen(false)}>
                        <CloseRoundedIcon fontSize="large" />
                    </button>
                </div>
            </Modal>
        </div>
    );
}

interface ModalProps{
    guesses: Word[]
}

const WinModal = ({guesses}: ModalProps) => {
    return (
        <>
            <h1 className="font-extrabold text-4xl">Congrats!</h1>
            
            <p>You got the word: {guesses[guesses.length - 1]?.word} in {guesses.length} {guesses.length === 1 ? "try" : "tries"}! 🥳</p>
        </>
    );
};

const LoseModal = ({guesses}: ModalProps) => {
    return (
        <>
            <h1 className="font-extrabold text-4xl">Nice try!</h1>
            
            <p>Better luck next time!</p>
        </>
    );
};