package com.example.Hockey.API.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "TeamMembers")
public class Manager_player_models {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Code_id")
    private Long Code_id;
    @Column(name = "User_id",nullable = false)

    private String Username;
    @Column(name = "Password")
    private String Password;

}
