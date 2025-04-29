import * as React from 'react';
import {LETTERS} from '../utility/constants.ts';

interface KeyboardProps{
    word: string,
    setWord: React.Dispatch<React.SetStateAction<string>>,
    submit: () => void
}

export default function Keyboard({word, setWord, submit}: KeyboardProps){
    // Methods/Handlers
    const handleOnPress = (key: string) => {
        if(key !== 'DEL' && key !== 'ENTER'){
            return () => {
                const newWord = word + key;
                setWord(newWord);
            }
        }
        else if(key === 'DEL'){
            return () => {
                const newWord = word.slice(0, -1);
                setWord(newWord);
            }
        }
        else{
            return submit;
        }
    }
    
    // Render
    return (
        <div className="flex flex-col gap-2 items-center w-md m-auto pb-4">
            {LETTERS.map((row: string[], index: number) => {
                return (
                    <div key={`keyboard-${index}`} className="flex flex-row gap-2 items-center">
                        {row.map((key: string, _) => {
                            return (
                                <button key={key}
                                        className="text-white w-12 h-12 bg-gray-400 rounded-lg"
                                        onClick={handleOnPress(key)}>
                                    {key}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}