package com.example.Hockey.API.Models;


import com.example.Hockey.API.RoleType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class UserDTO {
    private String FirstName;

    private String LastName;

    private String Email;

    private RoleType UserRole;

    private String Username;

    private Long phone_Number;

    public UserDTO(User user) {
        FirstName = user.getFirstName();
        LastName = user.getLastName();
        Email = user.getEmail();
        UserRole = user.getUserRole();
        Username = user.getUsername();
        this.phone_Number = user.getPhone_Number();
    }
}
