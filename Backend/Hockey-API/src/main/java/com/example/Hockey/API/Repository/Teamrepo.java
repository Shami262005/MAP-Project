package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.Team;
import com.example.Hockey.API.teamleague;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface Teamrepo extends JpaRepository<Team,Integer> {

}
