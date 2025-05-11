package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Team_Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerorManager extends JpaRepository<Team_Manager,Integer> {
}
