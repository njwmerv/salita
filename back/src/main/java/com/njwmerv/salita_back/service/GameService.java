package com.njwmerv.salita_back.service;

import com.njwmerv.salita_back.dto.GameDTO;
import com.njwmerv.salita_back.model.Game;
import com.njwmerv.salita_back.model.GameState;
import com.njwmerv.salita_back.repository.GameRepository;
import com.njwmerv.salita_back.repository.GameStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService{
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameStateRepository gameStateRepository;

    public GameDTO startGame(int dayID){
        Game game = gameRepository.findGameByID(dayID);
        if(game != null){
            return new GameDTO(game.getLength(), game.getAnswer(), null);
        }
        return null;
    }

    public GameDTO startGame(int dayID, String playerID){
        // Check if user is resuming or starting:
        GameState state = gameStateRepository.findGameStateByDayAndPlayerID(dayID, playerID);
        if(state == null){ // Starting a new game
            Game game = gameRepository.findGameByID(dayID); // Get details about new game

            // Save new game
            GameState newState = new GameState(null, dayID, playerID, game.getLength(), game.getAnswer());
            gameStateRepository.save(newState);

            return new GameDTO(game.getLength(), game.getAnswer(), null);
        }
        else{ // Resuming an old game
            return new GameDTO(state.getLength(), state.getAnswer(), state.getPreviousGuesses());
        }
    }
}
