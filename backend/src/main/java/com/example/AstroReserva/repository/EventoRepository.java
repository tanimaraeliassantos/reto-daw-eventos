package com.example.AstroReserva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AstroReserva.entities.EstadoEvento;
import com.example.AstroReserva.entities.Evento;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Integer> {

    
    List<Evento> findByEstado(EstadoEvento activo);

    
    List<Evento> findByDestacado(String destacado);

   
    List<Evento> findByTipoIdTipo(int idTipo);
}