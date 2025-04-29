package com.njwmerv.salita_back.repository;

import com.njwmerv.salita_back.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface GameRepository extends MongoRepository<Game, String>{
    @Query("{dayID: ?0}")
    Game findGameByID(int dayID);
}
