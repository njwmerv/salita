export enum States{
    WRONG = 0,
    PRESENT = 1,
    CORRECT = 2,
}

export type Word = {
    word: string,
    length: number,
    correctness: States[]
};
