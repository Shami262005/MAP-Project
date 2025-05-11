package com.example.Hockey.API.Controllers;

import com.example.Hockey.API.Models.LoginModel;
import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.Models.UserDTO;
import com.example.Hockey.API.Services.AddNewUser;
import com.example.Hockey.API.Services.ValidateUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")  
@RestController
@RequestMapping("Admin/")
public class AdminController {
    private final ValidateUser Validateuser;
    private final AddNewUser CreateUser;

    public AdminController(ValidateUser validateuser, AddNewUser newUser, AddNewUser createUser) {
        Validateuser = validateuser;
        CreateUser = createUser;

    }

    @PostMapping("Login")
    public ResponseEntity<UserDTO> AuthenticateUser(@RequestBody LoginModel userToAuth){
        return Validateuser.execute(userToAuth);
    }

    @PutMapping("NewUser")
    public ResponseEntity<String> putUser(@RequestBody User NewUser){

        System.out.println(NewUser.getEmail());
        System.out.println(NewUser.getFirstName());
        return CreateUser.execute(NewUser);
    }

}
