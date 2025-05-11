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
    private int user_id;

    @Column(name = "team_id",nullable = false)
    private int team_id;
    public Team_Manager(){

    }

    public Team_Manager(int user_id, int team_id) {
        this.user_id = user_id;
        this.team_id = team_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getTeam_id() {
        return team_id;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }
}
