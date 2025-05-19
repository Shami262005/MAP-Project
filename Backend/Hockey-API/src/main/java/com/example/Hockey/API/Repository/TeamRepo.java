package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TeamRepo extends JpaRepository<Team, Integer> {
    Optional<Team> findByName(String name);
}
