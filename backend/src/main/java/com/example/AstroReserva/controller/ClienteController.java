package com.example.AstroReserva.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.AstroReserva.entities.Evento;
import com.example.AstroReserva.entities.Reserva;
import com.example.AstroReserva.service.EventoService;
import com.example.AstroReserva.service.ReservaService;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final EventoService eventoService;
    private final ReservaService reservaService;

    public ClienteController(EventoService eventoService, ReservaService reservaService) {
        this.eventoService = eventoService;
        this.reservaService = reservaService;
    }

    @GetMapping("/activos")
    public List<Evento> activos() {
        return eventoService.eventosActivos();
    }

    @GetMapping("/destacados")
    public List<Evento> destacados() {
        return eventoService.eventosDestacados();
    }

    @GetMapping("/terminados")
    public List<Evento> terminados() {
        return eventoService.eventosTerminados();
    }

    @GetMapping("/cancelados")
    public List<Evento> cancelados() {
        return eventoService.eventosCancelados();
    }

    @GetMapping("/detalle/{id}")
    public Evento detalle(@PathVariable int id) {
        return eventoService.buscarPorId(id);
    }

    @GetMapping("/misReservas")
    public List<Reserva> misReservas(@AuthenticationPrincipal UserDetails userDetails) {
        return reservaService.misReservas(userDetails.getUsername());
    }

    @PostMapping("/reservar/{id}")
    public ResponseEntity<?> reservar(@PathVariable int id,
                                      @RequestParam int cantidad,
                                      @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Reserva reserva = reservaService.crearReserva(id, userDetails.getUsername(), cantidad);
            return ResponseEntity.status(201).body(reserva);
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @DeleteMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelar(@PathVariable int id) {
        reservaService.cancelarReserva(id);
        return ResponseEntity.ok("Reserva cancelada");
    }
}