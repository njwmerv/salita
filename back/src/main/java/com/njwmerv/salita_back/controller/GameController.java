package com.njwmerv.salita_back.controller;

import com.njwmerv.salita_back.dto.GameDTO;
import com.njwmerv.salita_back.dto.WordDTO;
import com.njwmerv.salita_back.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/game")
public class GameController{
    @Autowired
    private GameService gameService;

    @GetMapping("/start")
    public GameDTO startGame(@RequestParam String dayID, @RequestParam(required = false) String playerID){
        if(dayID == null) return null;

        final int intDayID = gameService.readDayIDParam(dayID);
        if(playerID == null){
            return gameService.startGame(intDayID);
        }
        else{
            return gameService.startGame(intDayID, playerID);
        }
    }

    @GetMapping("/archive")
    public int archiveLength(){
        return gameService.getIDToday();
    }

    @GetMapping("/guess")
    public WordDTO guessWord(@RequestParam String dayID, @RequestParam String word, @RequestParam(required = false) String playerID){
        if(dayID == null || word == null) return null;

        final int intDayID = gameService.readDayIDParam(dayID);
        if(playerID == null){
            return gameService.validateWord(intDayID, word);
        }
        else{
            return gameService.validateWord(intDayID, word, playerID);
        }
    }
}
