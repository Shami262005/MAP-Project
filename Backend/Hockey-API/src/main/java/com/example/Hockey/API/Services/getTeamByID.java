package com.example.Hockey.API.Services;

import com.example.Hockey.API.Exception_handling.NoTeambyID;
import com.example.Hockey.API.Interface.Command;
import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.Repository.Teamrepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class getTeamByID implements Command<Integer, Team> {
    private final Teamrepo teamrepo;

    public getTeamByID(Teamrepo teamrepo) {
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
