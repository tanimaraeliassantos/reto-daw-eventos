package com.example.AstroReserva.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.AstroReserva.dto.LoginRequest;
import com.example.AstroReserva.dto.RegisterRequest;
import com.example.AstroReserva.service.UsuarioService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        String token = usuarioService.login(
                request.getUsername(),
                request.getPassword()
        );

        return Map.of("token", token);
    }

    @PostMapping("/registro")
    public ResponseEntity<String> registro(@RequestBody RegisterRequest request) {
        try {
            usuarioService.registrar(
                request.getUsername(),
                request.getPassword(),
                request.getEmail()
            );
            return ResponseEntity.status(201).body("Usuario registrado");
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }
}