package com.njwmerv.salita_back.controller;

import com.njwmerv.salita_back.dto.GameDTO;
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

        int intDayID;
        if(dayID.equals("today")){
            intDayID = gameService.getIDToday();
        }
        else{
            try{
                intDayID = Integer.parseInt(dayID);
            }
            catch(NumberFormatException e){
                return null;
            }
        }

        if(playerID == null){
            return gameService.startGame(intDayID);
        }
        else{
            return gameService.startGame(intDayID, playerID);
        }
    }

    @GetMapping("/test")
    public String test(){
        return "test successful!";
    }
}
