package com.example.AstroReserva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AstroReserva.entities.TipoEvento;

public interface TipoEventoRepository extends JpaRepository<TipoEvento, Integer> {
}