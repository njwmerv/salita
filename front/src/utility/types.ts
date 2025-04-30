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
