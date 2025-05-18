package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Team_Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamManagerRepo extends JpaRepository<Team_Manager, Integer> {
    List<Team_Manager> findByTeamId(int teamId);
    List<Team_Manager> findByUserId(int userId);
}
