package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository <Event, Long> {
    
}
