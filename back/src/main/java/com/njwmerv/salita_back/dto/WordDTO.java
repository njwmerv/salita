package com.njwmerv.salita_back.dto;

import com.njwmerv.salita_back.model.CorrectnessState;

import java.util.List;

public class WordDTO{
    final private String word;
    final private boolean valid;
    final private List<CorrectnessState> correctness;

    public WordDTO(String word, boolean valid, List<CorrectnessState> correctness) {
        this.word = word;
        this.valid = valid;
        this.correctness = correctness;
    }

    public String getWord() {
        return word;
    }

    public boolean isValid() {
        return valid;
    }

    public List<CorrectnessState> getCorrectness() {
        return correctness;
    }
}
