package com.example.Hockey.API.Exception_handling;

public class NoTeambyID extends RuntimeException{
    public NoTeambyID(){
        super("Team does not exist");
    }
}
