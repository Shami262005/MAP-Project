package com.example.Hockey.API.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hockey.API.Models.Event;
import com.example.Hockey.API.Models.LoginModel;
import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.Models.UserDTO;
import com.example.Hockey.API.Services.AddNewUser;
import com.example.Hockey.API.Services.DeleteTeam;
import com.example.Hockey.API.Services.EventService;
import com.example.Hockey.API.Services.GetAllTeams;
import com.example.Hockey.API.Services.Teamregistration;
import com.example.Hockey.API.Services.ValidateUser;
import com.example.Hockey.API.Services.getTeamByID;
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

    @PostMapping("NewUser")
    public ResponseEntity<String> putUser(@RequestBody User NewUser){

        
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
