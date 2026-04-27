package controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;  // ← este import
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import entities.Reserva;
import service.ReservaService;

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