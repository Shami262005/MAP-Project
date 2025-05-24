package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Userepo extends JpaRepository<User,Integer> {

    User findByUserName(String Username);
    Boolean existsByUserName(String Username);
}
