package com.example.Hockey.API.Repository;

import com.example.Hockey.API.Models.OneTimeCodeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface OneTimeCoderepo extends JpaRepository<OneTimeCodeModel,Integer> {
    OneTimeCodeModel findBycode(int pin);
    Boolean existsBycode(int pin);
}
