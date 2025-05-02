import {MAX_GUESSES} from '../utility/constants.ts';
import {States, Word} from '../utility/types.ts';
import {isNullOrUndefined} from '../utility/helpers.ts';

interface BoardProps{
    word: string,
    length: number,
    guesses: Word[]
}

export default function Board({word, length, guesses}: BoardProps){
    // Render
    return (
        <div className="flex flex-col gap-1 items-center sm:w-md sm:m-auto mt-4 sm:mb-4">
            {guesses.map((_, index: number) => {
                return (
                    <BoardRow key={`board-${index}`} rowIndex={index} word={guesses[index]} length={length} />
                );
            })}
            
            {guesses.length < MAX_GUESSES &&
                <BoardRow key={`board-${guesses.length}`} rowIndex={guesses.length} guess={word} length={length} />
            }
            
            {Array.from({length: MAX_GUESSES - guesses.length - 1}).map((_, index: number) => {
                const realIndex: number = guesses.length + index + 1;
                return (
                    <BoardRow key={`board-${realIndex}`} rowIndex={realIndex} length={length} />
                );
            })}
        </div>
    );
}

interface BoardRowProps{
    key: string,
    word?: Word,
    guess?: string,
    length: number,
    rowIndex: number
}

function BoardRow({keyProp, word, guess, length, rowIndex}: BoardRowProps){
    // Render
    return (
        <div key={keyProp} className="flex flex-row gap-1 w-full justify-center">
            {word &&
                Array.from({length: length}).map((_, index: number) =>
                    <Tile key={`board-${rowIndex}-${index}`}
                          letter={word.word[index]}
                          correctness={word.correctness[index]}
                    />
                )
            }
            
            {guess &&
                Array.from({length: length}).map((_, index: number) =>
                    <Tile key={`board-${rowIndex}-${index}`}
                          letter={guess[index]}
                    />
                )
            }
            
            {!word && !guess &&
                Array.from({length: length}).map((_, index: number) =>
                    <Tile key={`board-${rowIndex}-${index}`} />
                )
            }
        </div>
    );
}

interface TileProps{
    key: string,
    letter?: string,
    correctness?: States
}

function Tile({letter, correctness}: TileProps){
    const tileColour = (): string => {
        switch(correctness){
            case States.WRONG:
                return "bg-gray-600";
            case States.PRESENT:
                return "bg-amber-300";
            case States.CORRECT:
                return "bg-green-600";
            default:
                return "bg-black border-4 border-solid border-gray-600";
        }
    };
    
    const textClass: string = "m-auto text-xl w-full text-center text-white";
    const containerClass: string = `flex flex-row items-center sm:size-18 size-13 ${tileColour()}`;
    
    // Render
    return (
        <div className={containerClass}>
            {!isNullOrUndefined(letter) || !isNullOrUndefined(correctness) ?
                <p className={textClass}>{letter?.toUpperCase()}</p>
                :
                null
            }
        </div>
    );
}
