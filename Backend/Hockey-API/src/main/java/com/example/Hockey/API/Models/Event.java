package com.example.Hockey.API.Models;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "events")
public class Event {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column (name = "")
    private int id;
    @Column (name = "event_name")
    private String title;
    @Column (name = "event_type")
    private String type;
    @Column (name = "venue")
    private String location;
    @Column (name = "date")
    private String date;
    @Column (name = "description")
    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
