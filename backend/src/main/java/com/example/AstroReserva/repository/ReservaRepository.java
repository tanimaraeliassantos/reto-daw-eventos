package com.example.AstroReserva.repository;

import org.springframework.data.jpa.repository.*;

import com.example.AstroReserva.entities.Reserva;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    
    @Query("SELECT COALESCE(SUM(r.cantidad),0) FROM Reserva r WHERE r.evento.idEvento = ?1")
    int totalReservado(int idEvento);

    
    @Query("SELECT COALESCE(SUM(r.cantidad),0) FROM Reserva r WHERE r.usuario.username = ?1 AND r.evento.idEvento = ?2")
    int totalPorUsuarioEvento(String username, int idEvento);

    
    List<Reserva> findByUsuarioUsername(String username);
}