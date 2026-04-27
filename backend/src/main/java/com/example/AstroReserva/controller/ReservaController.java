package com.example.AstroReserva.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;  // ← este import
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.AstroReserva.entities.Reserva;
import com.example.AstroReserva.service.ReservaService;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping("/{idEvento}")
    public Reserva reservar(@PathVariable int idEvento,
                            @RequestParam int cantidad,
                            @AuthenticationPrincipal UserDetails userDetails) {
        return reservaService.crearReserva(idEvento, userDetails.getUsername(), cantidad);
    }

    @GetMapping("/mis-reservas")
    public List<Reserva> misReservas(@AuthenticationPrincipal UserDetails userDetails) {
        return reservaService.misReservas(userDetails.getUsername());
    }

    @DeleteMapping("/{id}")
    public void cancelar(@PathVariable int id) {
        reservaService.cancelarReserva(id);
    }
}