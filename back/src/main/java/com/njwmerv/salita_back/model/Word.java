package com.njwmerv.salita_back.model;

import java.util.List;

public class Word{
    private final String word;
    private final List<CorrectnessState> correctness;

    public Word(String word, List<CorrectnessState> correctness) {
        this.word = word;
        this.correctness = correctness;
    }

    public String getWord() {
        return word;
    }

    public List<CorrectnessState> getCorrectness() {
        return correctness;
    }
}
