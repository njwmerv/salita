package com.njwmerv.salita_back.dto;

import java.util.List;

public class GameDTO{
    final private int length;
    final private List<String> previousGuesses;

    public GameDTO(int length, List<String> previousGuesses) {
        this.length = length;
        this.previousGuesses = previousGuesses;
    }

    public int getLength() {
        return length;
    }

    public List<String> getPreviousGuesses() {
        return previousGuesses;
    }
}
