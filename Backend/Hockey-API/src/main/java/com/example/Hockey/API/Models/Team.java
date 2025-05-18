package com.example.Hockey.API.Models;


import com.example.Hockey.API.TeamCategory;
import com.example.Hockey.API.teamleague;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
@Entity
@Table(name = "team")
public class Team {
    @Id
    @Column(name = "team_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int team_id;
    @Column(name = "team_name",nullable = false)
    private String team_name;
    @Column(name = "contact",nullable = false)
    private String contact;
    @Column(name = "team_address")
    private String teamAdress;
    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private TeamCategory category;
    @Column(name = "league")
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private teamleague league;
    @Column(name = "logo_url")
    private String logo;

    public int getTeam_id() {
        return team_id;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getTeamAdress() {
        return teamAdress;
    }

    public void setTeamAdress(String teamAdress) {
        this.teamAdress = teamAdress;
    }

    public TeamCategory getCategory() {
        return category;
    }

    public void setCategory(TeamCategory category) {
        this.category = category;
    }

    public teamleague getLeague() {
        return league;
    }

    public void setLeague(teamleague league) {
        this.league = league;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
