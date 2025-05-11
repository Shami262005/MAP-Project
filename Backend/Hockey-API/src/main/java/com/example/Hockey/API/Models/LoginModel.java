package com.example.Hockey.API.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class LoginModel {
    @Id
    @Column(name = "Username",unique = true,nullable = false)
    private String Username;
    @Column(name = "Password",nullable = false)
    private String hashed_Password;

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public String getHashed_Password() {
        return hashed_Password;
    }

    public void setHashed_Password(String hashed_Password) {
        this.hashed_Password = hashed_Password;
    }
}
