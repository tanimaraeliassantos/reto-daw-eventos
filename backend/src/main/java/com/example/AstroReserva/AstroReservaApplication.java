package com.example.AstroReserva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
// Al estar en el paquete raíz (com.example.AstroReserva),
// ya no necesitas @ComponentScan, lo hace solo.
@EntityScan(basePackages = "com.example.AstroReserva.entities")
@EnableJpaRepositories(basePackages = "com.example.AstroReserva.repository")
public class AstroReservaApplication {
    public static void main(String[] args) {
        SpringApplication.run(AstroReservaApplication.class, args);
    }
}