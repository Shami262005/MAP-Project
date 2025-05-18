package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Scanner;

@Repository
public interface Userepo extends JpaRepository<User,Integer> {

    User findByUsername(String Username);
    Boolean existsByUsername(String Username);
}
