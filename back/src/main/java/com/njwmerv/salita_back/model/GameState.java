package com.njwmerv.salita_back.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("GameState")
public class GameState{
    @Id
    private String id;
    private int dayID;
    private String playerID;
    final private int length;
    final private String answer;
    private List<Word> previousGuesses;

    public GameState(String id, int dayID, String playerID, int length, String answer){
        super();
        this.id = id;
        this.dayID = dayID;
        this.playerID = playerID;
        this.length = length;
        this.answer = answer;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public int getDayID() {
        return dayID;
    }

    public void setDayID(int dayID) {
        this.dayID = dayID;
    }

    public String getPlayerID() {
        return playerID;
    }

    public void setPlayerID(String playerID) {
        this.playerID = playerID;
    }

    public int getLength() {
        return length;
    }

    public String getAnswer() {
        return answer;
    }

    public List<Word> getPreviousGuesses() {
        return previousGuesses;
    }

    public void setPreviousGuesses(List<Word> previousGuesses) {
        this.previousGuesses = previousGuesses;
    }

    public void addGuess(Word guess){
        previousGuesses.add(guess);
    }
}
