package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepo extends JpaRepository <Event, Long> {
    List<Event> findByTeamId(int teamId);

}
