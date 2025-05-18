package com.example.Hockey.API.Services;

import com.example.Hockey.API.Exception_handling.UserDoesNotExist;
import com.example.Hockey.API.Exception_handling.WrongCode;
import com.example.Hockey.API.Interface.Query;
import com.example.Hockey.API.Models.OneTimeCodeModel;
import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.Repository.OneTimeCoderepo;
import com.example.Hockey.API.Repository.Userepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service

public class ValidateWithCode implements Query<Integer, User> {
    private final OneTimeCoderepo OTPrepo;
    private final Userepo Userepo;

    public ValidateWithCode(OneTimeCoderepo otPrepo, com.example.Hockey.API.Repository.Userepo userepo) {
        OTPrepo = otPrepo;
        Userepo = userepo;
    }

    @Override
    public ResponseEntity<User> execute(Integer input) {
        OneTimeCodeModel OTP;
        Optional<User> NewUser = null;
        Boolean isCodeValid = OTPrepo.existsBycode(input);
        if (isCodeValid){
            OTP = OTPrepo.findBycode(input);
            int user_id = OTP.getUser_id();
            NewUser = Userepo.findById(user_id);
        }else {
            throw new WrongCode();
        }


        return ResponseEntity.ok().body(NewUser.orElseThrow(UserDoesNotExist::new));
    }
}
