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
        <div className="flex flex-col gap-1 items-center w-md m-auto mt-4 mb-4">
            {guesses.map((_, index: number) => {
                return (
                    <BoardRow key={`board-${index}`} word={guesses[index]} length={length} />
                );
            })}
            
            {guesses.length < MAX_GUESSES &&
                <BoardRow key={`board-${guesses.length}`} guess={word} length={length} />
            }
            
            {Array.from({length: MAX_GUESSES - guesses.length - 1}).map((_, index: number) => {
                return (
                    <BoardRow key={`board-${guesses.length + index + 1}`} length={length} />
                );
            })}
        </div>
    );
}

interface BoardRowProps{
    key: string,
    word?: Word,
    guess?: string,
    length: number
}

function BoardRow({key, word, guess, length}: BoardRowProps){
    // Render
    return (
        <div key={key} className="flex flex-row gap-1 w-full justify-center">
            {word &&
                Array.from({length: length}).map((_, index: number) =>
                    <Tile key={`${key}-${index}`}
                          letter={word.word[index]}
                          correctness={word.correctness[index]}
                    />
                )
            }
            
            {guess &&
                Array.from({length: length}).map((_, index: number) =>
                    <Tile key={`${key}-${index}`}
                          letter={guess[index]}
                    />
                )
            }
            
            {!word && !guess &&
                Array.from({length: length}).map((_, index: number) =>
                    <Tile key={`${key}-${index}`} />
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

function Tile({key, letter, correctness}: TileProps){
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
    
    const textClass: string = "text-xl text-white w-16 h-16 text-center";
    const containerClass: string = "flex flex-row items-center w-16 h-16" + tileColour();
    
    // Render
    return (
        isNullOrUndefined(letter) && isNullOrUndefined(correctness) ?
            <div key={key} className={containerClass}>
                <p className={textClass}> </p>
            </div>
            :
            <div key={key} className={containerClass}>
                <p className={textClass}>{letter?.toUpperCase()}</p>
            </div>
    );
}
