package com.example.Hockey.API.Services;

import com.example.Hockey.API.Interface.Command;
import com.example.Hockey.API.Models.OneTimeCodeModel;
import com.example.Hockey.API.Models.Team_Manager;
import com.example.Hockey.API.Models.User;
import com.example.Hockey.API.Repository.OneTimeCoderepo;
import com.example.Hockey.API.Repository.PlayerorManager;
import com.example.Hockey.API.Repository.Userepo;
import com.example.Hockey.API.SendEmail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AddNewUser implements Command<User, String> {
    private Random rnd = new Random();
    private int randomCode ;
    OneTimeCodeModel newCode = null;
    private final SendEmail Send;
    private final Userepo Userepo;
    private final PlayerorManager PlayerOrManager;
    private final OneTimeCoderepo OTP;

    public AddNewUser(SendEmail send, com.example.Hockey.API.Repository.Userepo userepo, PlayerorManager playerOrManager, OneTimeCoderepo otp) {
        Send = send;
        Userepo = userepo;
        PlayerOrManager = playerOrManager;
        OTP = otp;
    }

    @Override
    public ResponseEntity<String> execute(User input) {
        BCryptPasswordEncoder PasswordEncoder = new BCryptPasswordEncoder(16);
        String EncryptedPassword = PasswordEncoder.encode(input.getHashed_Password());
        input.setHashed_Password(EncryptedPassword);
        Userepo.save(input);
        Team_Manager NewManagerorPlayer = new Team_Manager(input.getUser_id(),input.getTeam_id());
        PlayerOrManager.save(NewManagerorPlayer);
        randomCode = 10000000 + rnd.nextInt(90000000);
        newCode.setCode(randomCode);
        newCode.setUser_id(input.getUser_id());
        OTP.save(newCode);
        String StringCode = Integer.toString(randomCode);
        Send.sendEmail(input.getEmail(),"Login Code",StringCode);
        return ResponseEntity.ok().body("New user successfully created");
    }
}
