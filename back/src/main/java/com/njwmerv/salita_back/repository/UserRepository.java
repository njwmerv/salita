package com.njwmerv.salita_back.repository;

import com.njwmerv.salita_back.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String>{
    @Query("{id: ?0}")
    User findUserByID(String id);

    @Query("{email: ?0}")
    User findUserByEmail(String email);
}
