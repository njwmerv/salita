package com.njwmerv.salita_back.dto;

import java.util.List;

public class GameDTO{
    final private int length;
    final private String answer;
    final private List<String> previousGuesses;

    public GameDTO(int length, String answer, List<String> previousGuesses) {
        this.length = length;
        this.answer = answer;
        this.previousGuesses = previousGuesses;
    }

    public int getLength() {
        return length;
    }

    public String getAnswer() {
        return answer;
    }

    public List<String> getPreviousGuesses() {
        return previousGuesses;
    }
}
