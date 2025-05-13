package com.example.Hockey.API.Exception_handling;

public class NoTeamsUnderCategory extends RuntimeException{
    public NoTeamsUnderCategory(){
        super("Teams under specified category dont exist");
    }
}
