package com.example.Hockey.API;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum teamleague {
    @JsonProperty("junior league")
    juniorleague
    ,
    @JsonProperty("first division")
    firstdivision
    ,
    @JsonProperty("premier league")
    premierleague
}
