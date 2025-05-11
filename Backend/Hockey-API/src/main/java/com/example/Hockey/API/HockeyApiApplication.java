package com.example.Hockey.API;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,})
public class HockeyApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HockeyApiApplication.class, args);
	}

}
