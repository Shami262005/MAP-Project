package com.example.Hockey.API.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.Repository.TeamRepo;

@Service

public class GetAllTeams {
    private final TeamRepo Teamrop;

    public GetAllTeams(TeamRepo teamrop) {
        Teamrop = teamrop;
    }

    public ResponseEntity<List<Team>> getallteams(){
        List<Team> Allteams = Teamrop.findAll();
        return ResponseEntity.ok().body(Allteams);
    }
}
