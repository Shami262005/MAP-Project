package com.example.Hockey.API.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "team_manager")
public class Team_Manager {
    @Column(name = "user_id")
    @Id
    private int userId;

    @Column(name = "team_id",nullable = false)
    private int teamId;
    public Team_Manager(){
    }

    public Team_Manager(int user_id, int team_id) {
        this.userId = user_id;
        this.teamId = team_id;
    }

    public int getUser_id() {
        return userId;
    }

    public void setUser_id(int user_id) {
        this.userId = user_id;
    }

    public int getTeam_id() {
        return teamId;
    }

    public void setTeam_id(int team_id) {
        this.teamId = team_id;
    }
}
