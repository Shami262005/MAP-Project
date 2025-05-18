package com.example.Hockey.API.Exception_handling;

public class WrongCode extends RuntimeException{
    public WrongCode(){
        super("Wrong code, please enter correct code");
    }
}
