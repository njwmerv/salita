package com.njwmerv.salita_back.repository;

import com.njwmerv.salita_back.model.GameState;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface GameStateRepository extends MongoRepository<GameState, String>{
    @Query("{id: ?0}")
    GameState findGameStateByID(String id);

    @Query("{dayID: ?0, playerID: ?1}")
    GameState findGameStateByDayAndPlayerID(int dayID, String playerID);
}
