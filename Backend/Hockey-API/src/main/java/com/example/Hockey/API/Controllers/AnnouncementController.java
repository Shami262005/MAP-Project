package com.example.Hockey.API.Controllers;

import com.example.Hockey.API.Models.Announcement;
import com.example.Hockey.API.Service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @PostMapping("/sendAnnouncement")
    public Announcement sendAnnouncement(@RequestBody Announcement announcement) {
        return announcementService.saveAndBroadcast(announcement);
    }
}
