package com.example.Hockey.API.Exception_handling;

public class WrongUsernameorPasswordException extends RuntimeException {
    public WrongUsernameorPasswordException(){
        super("invalid Username or Password");
    }
}
