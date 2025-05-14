package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.teamleague;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Teamrepo extends JpaRepository<Team,Integer> {
    List<Team> FindTeambyCategory(teamleague C);
    void DeletebyLeague(teamleague T);
}
