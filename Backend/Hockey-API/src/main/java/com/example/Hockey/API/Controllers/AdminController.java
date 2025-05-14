package com.example.Hockey.API.Controllers;

import com.example.Hockey.API.Models.*;
import com.example.Hockey.API.Repository.Userepo;
import com.example.Hockey.API.RoleType;
import com.example.Hockey.API.Services.AddNewUser;
import com.example.Hockey.API.Services.EventService;
import com.example.Hockey.API.Services.ValidateUser;
import com.example.Hockey.API.Repository.TeamRepo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("Admin/")
public class AdminController {
    private final ValidateUser Validateuser;
    private final AddNewUser CreateUser;
    private final EventService eventService;
    private final Userepo userRepo;
    private final TeamRepo teamRepo;

    public AdminController(ValidateUser validateuser, AddNewUser newUser, AddNewUser createUser, EventService eventService, Userepo userRepo, TeamRepo teamRepo) {
        this.Validateuser = validateuser;
        this.CreateUser = createUser;
        this.eventService = eventService;
        this.userRepo = userRepo;
        this.teamRepo = teamRepo;
    }

    @PostMapping("Login")
    public ResponseEntity<UserDTO> AuthenticateUser(@RequestBody LoginModel userToAuth){
        return Validateuser.execute(userToAuth);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("NewUser")
    public ResponseEntity<String> putUser(@RequestBody User NewUser){
        System.out.println(NewUser.getEmail());
        System.out.println(NewUser.getFirstName());
        return CreateUser.execute(NewUser);
    }

    // request mappings for admin/events
    @GetMapping("Admin/Events/listEvents")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/Admin//Events/deleteEvent")
    public ResponseEntity<String> deleteEvents(@PathVariable Long id) {
        return ResponseEntity.ok("Event Successfully Deleted");
    }

    @PostMapping("/Admin/Events/newEvent")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvents(event));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/Admin/listPlayers")
    public List<User> getAllPlayers() {
        return userRepo.findByRole(String.valueOf(RoleType.PLAYER));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/Admin/listTeams")
    public List<Team> getAllTeams() {
        return teamRepo.findAll();
    }
}
