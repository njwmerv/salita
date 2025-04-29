package com.njwmerv.salita_back.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Game")
public class Game{
    @Id
    final private String id;
    final private int dayID;
    final private int length;
    final private String answer;

    public Game(String id, int dayID, int length, String answer) {
        super();
        this.id = id;
        this.dayID = dayID;
        this.length = length;
        this.answer = answer;
    }

    public String getId() {
        return id;
    }

    public int getDayID() {
        return dayID;
    }

    public int getLength() {
        return length;
    }

    public String getAnswer() {
        return answer;
    }
}
