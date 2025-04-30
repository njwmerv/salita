package com.njwmerv.salita_back.dto;

import com.njwmerv.salita_back.model.Word;

import java.util.List;

public class GameDTO{
    final private int length;
    final private List<Word> previousGuesses;

    public GameDTO(int length, List<Word> previousGuesses) {
        this.length = length;
        this.previousGuesses = previousGuesses;
    }

    public int getLength() {
        return length;
    }

    public List<Word> getPreviousGuesses() {
        return previousGuesses;
    }
}
