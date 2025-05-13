package com.example.Hockey.API.Models;


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
