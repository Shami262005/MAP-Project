package com.example.Hockey.API.Services;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Hockey.API.Exception_handling.NoTeambyID;
import com.example.Hockey.API.Repository.TeamRepo;

@Service
public class DeleteTeam {
    private final TeamRepo reop;

    public DeleteTeam(TeamRepo reop) {
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


}
