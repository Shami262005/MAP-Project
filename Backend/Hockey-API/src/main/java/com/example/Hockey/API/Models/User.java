package com.example.Hockey.API.Models;

import com.example.Hockey.API.RoleType;
import jakarta.persistence.*;
import org.springframework.validation.annotation.Validated;

@Entity
@Table(name = "users")
public class User {

    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int User_id;
    @Column(name = "first_name")
    private String FirstName;
    @Column(name = "last_name")
    private String LastName;
    @Column(name = "email",unique = true,nullable = false)
    private String Email;
    @Column(name = "password")
    private String hashed_Password;
    @Column(name = "user_role",nullable = false)
    private RoleType UserRole;
    @Column(name = "username",unique = true,nullable = false)
    private String Username;
    @Column(name = "Phone_Number")
    private Long phone_Number;

    public RoleType getUserRole() {
        return UserRole;
    }

    public void setUserRole(RoleType userRole) {
        UserRole = userRole;
    }

    public int getUser_id() {
        return User_id;
    }

    public void setUser_id(int user_id) {
        User_id = user_id;
    }

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
