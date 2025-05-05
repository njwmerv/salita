import {ChangeEvent, useEffect, useState} from 'react';
import Board from '../components/Board.tsx';
import Modal from '../components/Modal.tsx';
import words from './../tagalog_words.json';
import {toast} from 'react-toastify';
import Keyboard from '../components/Keyboard.tsx';
import {MAX_GUESSES} from '../utility/constants.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import {useNavigate, useParams} from 'react-router-dom';
import {GameDTO, States, Word, WordDTO} from '../utility/types.ts';
import {ARCHIVE_PAGE_ROUTE, GAME_START_MAPPING, DAY_ID_PARAM, GAME_GUESS_MAPPING, WORD_PARAM, ATTEMPTS_PARAM} from '../utility/routes.ts';

export default function GamePage(){
    // State Variables
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [won, setWon] = useState<boolean>(false);
    const [word, setWord] = useState<string>('');
    const [length, setLength] = useState<number>(7);
    const [guesses, setGuesses] = useState<Word[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const disabled: boolean = guesses.length > 0 ?
        guesses.length >= MAX_GUESSES || didWin(guesses[guesses.length - 1].correctness) : false;
    
    // Methods/Handlers
    async function getGameData(): Promise<GameDTO> {
        const url: string = GAME_START_MAPPING + `?${DAY_ID_PARAM}=${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.json();
    }
    
    async function sendGuess(): Promise<WordDTO> {
        const url: string = GAME_GUESS_MAPPING + `?${DAY_ID_PARAM}=${id}&${WORD_PARAM}=${word}&${ATTEMPTS_PARAM}=${guesses.length}`;
        const response: Response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
    
    function handleGuess(){
        if(!words.includes(word.toUpperCase())) {
            toast.warn("This is not a valid word.");
            return;
        }
        for(const guess of guesses){
            if(guess.word.toUpperCase() === word.toUpperCase()){
                toast.warn("You already guessed this word");
                return;
            }
        }
        toast.promise(sendGuess(), {
            pending: "Checking answer...",
            success: "Answer processed.",
            error: "An error has occurred"
        }).then((response: WordDTO) => {
            if(response.valid){
                const newWord: Word = {word: response.word, length: response.word.length, correctness: response.correctness};
                const newGuesses: Word[] = [...guesses, newWord];
                const willWin: boolean = didWin(newWord.correctness);
                setWon(willWin);
                setIsOpen(willWin || newGuesses.length >= MAX_GUESSES);
                setGuesses(newGuesses);
                if(response.answer) setWord(response.answer);
                else if(!willWin) setWord('');
            }
            else{
                toast.warn("This is not a valid word.");
            }
        });
    }
    
    function didWin(correctness: States[]): boolean {
        for(const state of correctness){
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
    
    const WinModal = () => {
        return (
            <>
                <h1 className="font-extrabold text-4xl">Congrats!</h1>
                
                <p>You got the word: {word} in {guesses.length} {guesses.length === 1 ? "try" : "tries"}! 🥳</p>
            </>
        );
    };
    
    const LoseModal = () => {
        return (
            <>
                <h1 className="font-extrabold text-4xl">Nice try!</h1>
                
                <p>Better luck next time! The word was {word}</p>
            </>
        );
    };
    
    // Effects
    useEffect(() => {
        if(!id) navigate(ARCHIVE_PAGE_ROUTE);
        else{
            setWord('');
            toast.promise(getGameData(), {
                pending: "Accessing game data. Please wait...",
                success: "Game is now ready. Have fun!",
                error:{
                    render() {
                        navigate(ARCHIVE_PAGE_ROUTE);
                        return "Failed to load game data, redirecting to Archive Page";
                    },
                }
            }).then((value: GameDTO) => {
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
                       setWord(event.target.value);
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
                        <WinModal />
                        :
                        <LoseModal />
                    }
                    
                    <a href={`https://tagalog.pinoydictionary.com/word/${word.toLowerCase()}/`}
                       target="_blank"
                       className="underline hover:text-amber-300">
                        Definition
                    </a>
                    
                    <div>
                        {guesses.map((_: Word, index: number) => {
                            return <p key={`result-${index}`}>{renderGuesses(index)}</p>;
                        })}
                    </div>
                    
                    
                    <button className="flex flex-row align-middle items-center w-fit h-12 p-2 gap-2 bg-amber-300 rounded-2xl hover:cursor-pointer"
                            onClick={() => {
                                toast.success("Results copied successfully");
                                navigator.clipboard.writeText(guessesToString())
                            }}>
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
