package com.example.Hockey.API.Models;

import jakarta.persistence.*;
import lombok.Data;

@Data
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
}
