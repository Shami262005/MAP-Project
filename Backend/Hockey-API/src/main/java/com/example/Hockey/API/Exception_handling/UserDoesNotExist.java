package com.example.Hockey.API.Exception_handling;

public class UserDoesNotExist extends RuntimeException {
    public UserDoesNotExist(){
        super("User does not exist, please contact the Administrator");
    }
}
