package com.example.Hockey.API.Services;

import com.example.Hockey.API.Models.Event;
import com.example.Hockey.API.Repository.EventRepo;
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

    public Event createEvents(Event event) {
        return eventRepo.save(event);
    }

    public void deleteEvents(Long id) {
        eventRepo.deleteById(id);
    }
}
