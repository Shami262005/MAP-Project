package com.example.Hockey.API.Services;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Hockey.API.Exception_handling.NoTeambyID;
import com.example.Hockey.API.Interface.Command;
import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.Repository.TeamRepo;
@Service
public class getTeamByID implements Command<Integer, Team> {
    private final TeamRepo teamrepo;

    public getTeamByID(TeamRepo teamrepo) {
        this.teamrepo = teamrepo;
    }

    @Override
    public ResponseEntity<Team> execute(Integer input) {
        Optional<Team> RetrievedTeam = teamrepo.findById(input);
        if(RetrievedTeam.isEmpty()){
            throw new NoTeambyID();
        }

        return ResponseEntity.ok().body(RetrievedTeam.orElseThrow(NoTeambyID::new));
    }
}
