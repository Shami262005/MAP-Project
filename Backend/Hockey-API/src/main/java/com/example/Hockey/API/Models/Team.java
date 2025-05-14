package com.example.Hockey.API.Models;

import jakarta.persistence.*;
import lombok.Data;

import com.example.Hockey.API.TeamCategory;
import com.example.Hockey.API.teamleague;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

@Entity
@Table(name = "team")
@Data
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "team_name", nullable = false, unique = true)
    private String name;

    @Column(name = "team_category")
    private String category;

    @Column(name = "league", nullable = false)
    private String league;

    @Column(name = "contact", nullable = false)
    private String contact;

    @Column(name = "team_address")
    private String address;

    public Team() {}

    public Team(String name, String category, String league, String contact, String address) {
        this.name = name;
        this.category = category;
        this.league = league;
        this.contact = contact;
        this.address = address;
    }

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
}
