package com.example.Hockey.API.Models;

import com.example.Hockey.API.RoleType;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import org.springframework.validation.annotation.Validated;

@Entity
@Table(name = "users")
public class User {

    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int User_id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "email",unique = true,nullable = false)
    private String email;
    @Column(name = "password")
    private String hashed_Password;
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "user_role",nullable = false)
    private RoleType userRole ;
    @Column(name = "username",unique = true,nullable = false)
    private String username;
    @Column(name = "phone")
    private Long phone_Number;
    @Transient
    private int team_id;

    public int getUser_id() {
        return User_id;
    }

    public void setUser_id(int user_id) {
        User_id = user_id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHashed_Password() {
        return hashed_Password;
    }

    public void setHashed_Password(String hashed_Password) {
        this.hashed_Password = hashed_Password;
    }

    public RoleType getUserRole() {
        return userRole;
    }

    public void setUserRole(RoleType userRole) {
        this.userRole = userRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getPhone_Number() {
        return phone_Number;
    }

    public void setPhone_Number(Long phone_Number) {
        this.phone_Number = phone_Number;
    }

    public int getTeam_id() {
        return team_id;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }
}
