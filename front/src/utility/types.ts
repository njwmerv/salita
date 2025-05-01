export enum States{
    WRONG = "WRONG",
    PRESENT = "PRESENT",
    CORRECT = "CORRECT",
}

export type Word = {
    word: string,
    length: number,
    correctness: States[]
};

export type GameDTO = {
    length: number,
    previousGuesses: Word[]
}

export type WordDTO = {
    word: string,
    valid: boolean,
    correctness: States[]
}