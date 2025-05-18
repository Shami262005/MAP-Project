package com.example.Hockey.API.Services;

import com.example.Hockey.API.Interface.Query;
import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.Repository.Teamrepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class Teamregistration implements Query<Team,String> {
    private final Teamrepo Teamrop;

    public Teamregistration(Teamrepo teamrop) {
        Teamrop = teamrop;
    }

    @Override
    public ResponseEntity<String> execute(Team input) {
        Team Teamname = Teamrop.save(input);
        return ResponseEntity.ok().body("Succesfully entered team name: "+Teamname.getTeam_name());
    }
}
