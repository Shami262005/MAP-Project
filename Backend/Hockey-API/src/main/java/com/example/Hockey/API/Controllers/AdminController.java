package com.example.Hockey.API.Controllers;

import com.example.Hockey.API.Models.LoginModel;
import com.example.Hockey.API.Models.UserDTO;
import com.example.Hockey.API.Services.ValidateUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Admin/")
public class AdminController {
    private final ValidateUser Validateuser;

    public AdminController(ValidateUser validateuser) {
        Validateuser = validateuser;
    }

    @PostMapping("Login")
    public ResponseEntity<UserDTO> AuthenticateUser(@RequestBody LoginModel userToAuth){
        return Validateuser.execute(userToAuth);
    }

}
