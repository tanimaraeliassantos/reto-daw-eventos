package com.example.AstroReserva.service;

import org.springframework.stereotype.Service;

import com.example.AstroReserva.entities.Evento;
import com.example.AstroReserva.entities.Reserva;
import com.example.AstroReserva.entities.Usuario;
import com.example.AstroReserva.repository.EventoRepository;
import com.example.AstroReserva.repository.ReservaRepository;
import com.example.AstroReserva.repository.UsuarioRepository;

import java.util.List;

@Service
public class ReservaService {

    private ReservaRepository reservaRepository;
    private EventoRepository eventoRepository;
    private UsuarioRepository usuarioRepository;

    public ReservaService(ReservaRepository reservaRepository,
                          EventoRepository eventoRepository,
                          UsuarioRepository usuarioRepository) {
        this.reservaRepository = reservaRepository;
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Reserva crearReserva(int idEvento, String username, int cantidad) {

        if (cantidad <= 0) {
            throw new RuntimeException("Cantidad inválida");
        }

        if (cantidad > 10) {
            throw new RuntimeException("Máximo 10 plazas por reserva");
        }

        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException("Evento no existe"));

        if (!evento.getEstado().equals("ACTIVO")) {
            throw new RuntimeException("Evento no disponible");
        }

        int totalReservado = reservaRepository.totalReservado(idEvento);

        if (totalReservado + cantidad > evento.getAforoMaximo()) {
            throw new RuntimeException("Aforo completo");
        }

        int reservadoUsuario = reservaRepository
                .totalPorUsuarioEvento(username, idEvento);

        if (reservadoUsuario + cantidad > 10) {
            throw new RuntimeException("Ya alcanzaste el máximo en este evento");
        }

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no existe"));

        Reserva reserva = new Reserva();
        reserva.setEvento(evento);
        reserva.setUsuario(usuario);
        reserva.setCantidad(cantidad);
        reserva.setPrecioVenta(evento.getPrecio());

        return reservaRepository.save(reserva);
    }

    public List<Reserva> misReservas(String username) {
        return reservaRepository.findByUsuarioUsername(username);
    }

    public void cancelarReserva(int id) {
        reservaRepository.deleteById(id);
    }
}