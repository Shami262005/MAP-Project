package com.example.Hockey.API.Controllers;

import com.example.Hockey.API.Models.LoginModel;
import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.Models.UserDTO;
import com.example.Hockey.API.Services.ValidateUser;
import com.example.Hockey.API.Services.ValidateWithCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Player/")
public class PlayerController {
    private final ValidateUser Validateuser;
    private final ValidateWithCode ValidateWCode;

    public PlayerController(ValidateUser validateuser, ValidateWithCode validateWCode) {
        Validateuser = validateuser;
        ValidateWCode = validateWCode;
    }

    @GetMapping("Login")
    public ResponseEntity<UserDTO> AuthenticateUser(@RequestBody LoginModel userToAuth){
        return Validateuser.execute(userToAuth);
    }
    @GetMapping("CodeLogin")
    public ResponseEntity<User> AuthenticateUser(@RequestParam(name = "code") int code){
        return ValidateWCode.execute(code);
    }
}
