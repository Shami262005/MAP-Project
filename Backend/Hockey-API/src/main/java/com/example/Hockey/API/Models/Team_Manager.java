package com.example.Hockey.API.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Team_Manager")
public class Team_Manager {
    @Column(name = "Manager_Id")
    @Id
    private String FirstName;
    @Column(name = "LastName")
    private String LastName;
    @Column(name = "Email")
    private String Email;
    @Column(name = "Password")
    private String hashed_Password;
    @Column(name = "Username")
    private String Username;
    @Column(name = "Phone_Number")
    private Long phone_Number;

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getHashed_Password() {
        return hashed_Password;
    }

    public void setHashed_Password(String hashed_Password) {
        this.hashed_Password = hashed_Password;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public Long getPhone_Number() {
        return phone_Number;
    }

    public void setPhone_Number(Long phone_Number) {
        this.phone_Number = phone_Number;
    }
}
