package com.example.Hockey.API.Services;

import com.example.Hockey.API.Models.Event;
import com.example.Hockey.API.Repository.EventRepo;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepo eventRepo;

    public EventService ( EventRepo eventRepo) {
        this.eventRepo = eventRepo;
    }

    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }
    @Transactional
    public Event createEvents(Event event) {
        return eventRepo.save(event);
    }
    @Transactional
    public ResponseEntity<String> deleteEvents(int id) {
        eventRepo.deleteById(id);
        return ResponseEntity.ok().body("Successfully deleted");
    }
}
