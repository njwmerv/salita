package com.njwmerv.salita_back.service;

import com.njwmerv.salita_back.dto.GameDTO;
import com.njwmerv.salita_back.dto.WordDTO;
import com.njwmerv.salita_back.model.CorrectnessState;
import com.njwmerv.salita_back.model.Game;
import com.njwmerv.salita_back.model.GameState;
import com.njwmerv.salita_back.model.Word;
import com.njwmerv.salita_back.repository.GameRepository;
import com.njwmerv.salita_back.repository.GameStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class GameService{
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameStateRepository gameStateRepository;

    public int readDayIDParam(String dayID){
        if(dayID.equals("today")) return getIDToday();
        try{
            return Integer.parseInt(dayID);
        }
        catch(NumberFormatException e){
            return getIDToday();
        }
    }

    public int getIDToday(){
        final LocalDate DAY_ONE = LocalDate.of(2025, 4, 28);
        final LocalDate today = LocalDate.now();
        return (int) ChronoUnit.DAYS.between(DAY_ONE, today); // No way I reach the int limit
    }

    public GameDTO startGame(int dayID){
        Game game = gameRepository.findGameByID(dayID);
        if(game != null){
            return new GameDTO(game.getLength(), null);
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

            return new GameDTO(game.getLength(), null);
        }
        else{ // Resuming an old game
            return new GameDTO(state.getLength(), state.getPreviousGuesses());
        }
    }

    public WordDTO validateWord(int dayID, String guess){
        final Game game = gameRepository.findGameByID(dayID);
        if(game == null) return null;
        final int length = game.getLength();
        final String answer = game.getAnswer();
        List<CorrectnessState> correctness = checkWord(guess, answer, length);
        return new WordDTO(guess, true, correctness);
    }

    public WordDTO validateWord(int dayID, String guess, String playerID){
        GameState state = gameStateRepository.findGameStateByDayAndPlayerID(dayID, playerID);
        if(state == null){ // If can't find this game state, then just treat as if logged out
            return validateWord(dayID, guess);
        }
        // Add guess to repo
        final List<CorrectnessState> correctness = checkWord(guess, state.getAnswer(), state.getLength());
        state.addGuess(new Word(guess, correctness));
        gameStateRepository.save(state);

        return new WordDTO(guess, true, correctness);
    }

    private List<CorrectnessState> checkWord(String guess, String answer, int length){
        List<CorrectnessState> correctness = new ArrayList<>(Collections.nCopies(length, CorrectnessState.WRONG));
        List<Boolean> used = new ArrayList<>(Collections.nCopies(length, false));

        // Find CORRECTs
        for(int i = 0; i < length; i++){
            if(answer.charAt(i) == guess.charAt(i)){
                correctness.set(i, CorrectnessState.CORRECT);
                used.set(i, true);
            }
        }

        // Find PRESENTs
        for(int i = 0; i < length; i++){
            final int j = findUnusedIndex(guess.charAt(i), answer, used, length);
            if(correctness.get(i) == CorrectnessState.WRONG && j > -1){
                correctness.set(i, CorrectnessState.PRESENT);
                used.set(j, true);
            }
        }

        return correctness;
    }

    private int findUnusedIndex(char c, String answer, List<Boolean> used, int length){
        for(int i = 0; i < length; i++){
            if(answer.charAt(i) == c && !used.get(i)){
                return i;
            }
        }
        return -1;
    }
}
