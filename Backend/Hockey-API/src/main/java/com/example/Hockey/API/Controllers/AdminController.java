package com.example.Hockey.API.Controllers;

import com.example.Hockey.API.Models.LoginModel;
import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.Models.UserDTO;
import com.example.Hockey.API.Models.Event;
import com.example.Hockey.API.Services.AddNewUser;
import com.example.Hockey.API.Services.EventService;
import com.example.Hockey.API.Services.ValidateUser;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("Admin/")
public class AdminController {
    private final ValidateUser Validateuser;
    private final AddNewUser CreateUser;
    private final EventService eventService;

    public AdminController(ValidateUser validateuser, AddNewUser newUser, AddNewUser createUser, EventService eventService) {
        this.Validateuser = validateuser;
        this.CreateUser = createUser;
        this.eventService = eventService;
    }

    @PostMapping("Login")
    public ResponseEntity<UserDTO> AuthenticateUser(@RequestBody LoginModel userToAuth){
        return Validateuser.execute(userToAuth);
    }

    @PutMapping("NewUser")
    public ResponseEntity<String> putUser(@RequestBody User NewUser){
        return CreateUser.execute(NewUser);
    }

    // request mappings for admin/events
    @GetMapping("Event")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
    
    @PostMapping("Event")
    public ResponseEntity<String> deleteEvents(@PathVariable Long id) {
        return ResponseEntity.ok("Event Successfully Deleted");
    }

    @PostMapping("Event")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvents(event));
    }
}
