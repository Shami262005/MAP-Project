package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface TeamRepo extends JpaRepository<Team, Integer> {
    
}
