package com.example.Hockey.API.Services;

import com.example.Hockey.API.Exception_handling.NoTeamsUnderCategory;
import com.example.Hockey.API.Interface.Query;
import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.Repository.Teamrepo;
import com.example.Hockey.API.TeamCategory;
import com.example.Hockey.API.teamleague;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FindTeams {
    private final Teamrepo Teamrop;

    public FindTeams(Teamrepo teamrop) {
        Teamrop = teamrop;
    }

    public ResponseEntity<List<Team>> getByCategory(teamleague C){
        List<Team> TeamsbyC;
        boolean teamexists = Teamrop.FindTeambyCategory(C).isEmpty();
        if(!teamexists){
            TeamsbyC = Teamrop.FindTeambyCategory(C);
        }else {
            throw new NoTeamsUnderCategory();
        }
        return ResponseEntity.ok().body(TeamsbyC);
    }

}
