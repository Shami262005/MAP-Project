package com.example.Hockey.API.Controllers;

import com.example.Hockey.API.Models.*;
import com.example.Hockey.API.Services.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")  
@RestController
@RequestMapping("Admin/")
public class AdminController {
    private final getTeamByID getTeamByID;
    private final DeleteTeam deleteTeam;
    private final ValidateUser Validateuser;
    private final GetAllTeams getallteams;
    private final AddNewUser CreateUser;
    private final Teamregistration Teamreg;

    private final EventService eventService;

    public AdminController(ValidateUser validateuser, AddNewUser newUser, AddNewUser createUser) {
        Validateuser = validateuser;
        CreateUser = createUser;

    }

    @PostMapping("Login")
    public ResponseEntity<UserDTO> AuthenticateUser(@RequestBody LoginModel userToAuth){
        return Validateuser.execute(userToAuth);
    }
    @GetMapping("getTeamByID")
    public ResponseEntity<Team> getTeamById(@RequestParam(name = "Id") int Id){
        return getTeamByID.execute(Id);
    }

    @PutMapping("NewUser")
    public ResponseEntity<String> putUser(@RequestBody User NewUser){

        System.out.println(NewUser.getEmail());
        System.out.println(NewUser.getFirstName());
        return CreateUser.execute(NewUser);
    }
    @GetMapping("getallTeams")
    public ResponseEntity<List<Team>> getAllTeams(){
        return getallteams.getallteams();
    }
    @DeleteMapping("deleteAllTeams")
    public ResponseEntity<String> deleteAllTeams(){
        return deleteTeam.DeleteAll();
    }
    @DeleteMapping("deletebyId")
    public ResponseEntity<String> deleteTeamById(@RequestParam(name = "Id") int Id){
        return deleteTeam.DeletebyId(Id);
    }
    @PutMapping("addNewTeam")
    public ResponseEntity<String> addNewTeam(@RequestBody Team input){
        return Teamreg.execute(input);
    }

    // request mappings for admin/events
    @GetMapping("getAllEvent")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
    
    @PostMapping("deleteEvent")
    public ResponseEntity<String> deleteEvents(@RequestParam int id) {
        return eventService.deleteEvents(id);
    }

    @PostMapping("CreateEvent")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvents(event));
    }
}
