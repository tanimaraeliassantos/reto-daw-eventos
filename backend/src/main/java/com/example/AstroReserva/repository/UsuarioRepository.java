package com.example.AstroReserva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AstroReserva.entities.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    Optional<Usuario> findByUsername(String username);
}