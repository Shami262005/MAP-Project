package com.example.Hockey.API.Service;

import com.example.Hockey.API.Models.Announcement;
import com.example.Hockey.API.Repository.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepo announcementRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public Announcement saveAndBroadcast(Announcement announcement) {
        if (announcement.getDate_published() == null) {
            announcement.setDate_published(LocalDate.now());
        }
        if (announcement.getTime_published() == null) {
            announcement.setTime_published(LocalTime.now());
        }

        Announcement saved = announcementRepo.save(announcement);
        messagingTemplate.convertAndSend("/topic/announcements", saved);
        return saved;
    }
}
