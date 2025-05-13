package com.example.Hockey.API.Services;

import com.example.Hockey.API.Exception_handling.NoTeambyID;
import com.example.Hockey.API.Repository.Teamrepo;
import com.example.Hockey.API.teamleague;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteTeam {
    private final Teamrepo reop;

    public DeleteTeam(Teamrepo reop) {
        this.reop = reop;
    }

    public ResponseEntity<String> DeleteAll(){
        reop.deleteAll();
        return ResponseEntity.ok().body("Deletion of all teams successful");
    }
    public ResponseEntity<String> DeletebyId(int ID){
        Boolean exists = reop.existsById(ID);
        if (exists){
            reop.deleteById(ID);
        }else {
            throw new NoTeambyID();
        }
        return ResponseEntity.ok().body("Deletion of all teams successful");
    }
    public ResponseEntity<String> DeletebyCategory(teamleague T){
        reop.DeletebyLeague(T);
    }

}
