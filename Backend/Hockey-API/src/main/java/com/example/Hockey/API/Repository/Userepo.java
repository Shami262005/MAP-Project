package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface Userepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(String role); // useful to list all coaches or managers
}

