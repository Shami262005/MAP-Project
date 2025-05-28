package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepo extends JpaRepository<Announcement, Integer> {
}
