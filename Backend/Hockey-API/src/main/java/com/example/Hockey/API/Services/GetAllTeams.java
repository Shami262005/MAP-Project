package com.example.Hockey.API.Services;

import com.example.Hockey.API.Interface.Command;
import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.Repository.Teamrepo;
import jakarta.persistence.Entity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class GetAllTeams {
    private final Teamrepo Teamrop;

    public GetAllTeams(Teamrepo teamrop) {
        Teamrop = teamrop;
    }

    public ResponseEntity<List<Team>> getallteams(){
        List<Team> Allteams = Teamrop.findAll();
        return ResponseEntity.ok().body(Allteams);
    }
}
