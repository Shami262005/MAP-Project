package com.example.Hockey.API.Models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Entity
@Table(name="announcements")
@Data
public  class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String image_url;
    private String heading;
    private String description;
    private LocalDate date_published;
    private LocalTime time_published;
}