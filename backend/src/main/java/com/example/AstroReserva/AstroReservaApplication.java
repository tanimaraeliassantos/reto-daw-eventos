package com.example.AstroReserva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "entities")
@EnableJpaRepositories(basePackages = "repository")
@ComponentScan(basePackages = {"controller", "service", "security"})
public class AstroReservaApplication {
    public static void main(String[] args) {
        SpringApplication.run(AstroReservaApplication.class, args);
    }
}