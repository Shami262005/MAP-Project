package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Userepo extends JpaRepository<User,String> {
}
