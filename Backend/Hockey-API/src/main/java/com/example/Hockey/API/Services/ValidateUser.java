package com.example.Hockey.API.Services;

import com.example.Hockey.API.Exception_handling.WrongUsernameorPasswordException;
import com.example.Hockey.API.Interface.Query;
import com.example.Hockey.API.Models.LoginModel;
import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.Models.UserDTO;
import com.example.Hockey.API.Repository.Userepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ValidateUser implements Query<LoginModel, UserDTO> {
    UserDTO verifiedUser = null;
    private final Userepo userepo;

    public ValidateUser(Userepo userepo) {
        this.userepo = userepo;
    }


    @Override
    public ResponseEntity<UserDTO> execute(LoginModel input) {

        User UserCredentials;
        Boolean UserExists = userepo.existsByUserName(input.getUsername());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        if(UserExists) {
            UserCredentials = userepo.findByUserName(input.getUsername());
            String Password = UserCredentials.getHashed_Password();
            boolean isPasswodCorrect = encoder.matches(input.getHashed_Password(), Password);
            if (isPasswodCorrect) {
                verifiedUser = new UserDTO(UserCredentials);
            } else {
                throw new WrongUsernameorPasswordException();
            }
        }
        return ResponseEntity.ok().body(verifiedUser);
    }
}
