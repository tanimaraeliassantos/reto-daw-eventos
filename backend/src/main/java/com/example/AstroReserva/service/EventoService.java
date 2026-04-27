package com.example.AstroReserva.service;

import org.springframework.stereotype.Service;

import com.example.AstroReserva.dto.EventoDTO;
import com.example.AstroReserva.entities.EstadoEvento;
import com.example.AstroReserva.entities.Evento;
import com.example.AstroReserva.entities.TipoEvento;
import com.example.AstroReserva.repository.EventoRepository;
import com.example.AstroReserva.repository.TipoEventoRepository;

import java.util.List;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;
    private final TipoEventoRepository tipoRepository;

    public EventoService(EventoRepository eventoRepository,
                         TipoEventoRepository tipoRepository) {
        this.eventoRepository = eventoRepository;
        this.tipoRepository = tipoRepository;
    }

    public List<Evento> eventosActivos() {
        return eventoRepository.findByEstado(EstadoEvento.ACTIVO);
    }

    public List<Evento> eventosDestacados() {
        return eventoRepository.findByDestacado("S");
    }

    public List<Evento> eventosPorTipo(int idTipo) {
        return eventoRepository.findByTipoIdTipo(idTipo);
    }

    public Evento buscarPorId(int id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    }

    public Evento crearEvento(EventoDTO dto) {

        TipoEvento tipo = tipoRepository.findById(dto.getIdTipo())
                .orElseThrow(() -> new RuntimeException("Tipo no existe"));

        Evento evento = new Evento();
        evento.setNombre(dto.getNombre());
        evento.setDescripcion(dto.getDescripcion());
        evento.setFechaInicio(dto.getFechaInicio());
        evento.setDuracion(dto.getDuracion());
        evento.setDireccion(dto.getDireccion());
        evento.setEstado(EstadoEvento.ACTIVO);
        evento.setDestacado("N");
        evento.setAforoMaximo(dto.getAforoMaximo());
        evento.setMinimoAsistencia(dto.getMinimoAsistencia());
        evento.setPrecio(dto.getPrecio());
        evento.setTipo(tipo);

        return eventoRepository.save(evento);
    }

    public Evento editarEvento(int id, EventoDTO dto) {

        Evento evento = buscarPorId(id);

        TipoEvento tipo = tipoRepository.findById(dto.getIdTipo())
                .orElseThrow(() -> new RuntimeException("Tipo no existe"));

        evento.setNombre(dto.getNombre());
        evento.setDescripcion(dto.getDescripcion());
        evento.setFechaInicio(dto.getFechaInicio());
        evento.setDuracion(dto.getDuracion());
        evento.setDireccion(dto.getDireccion());
        evento.setAforoMaximo(dto.getAforoMaximo());
        evento.setMinimoAsistencia(dto.getMinimoAsistencia());
        evento.setPrecio(dto.getPrecio());
        evento.setTipo(tipo);

        return eventoRepository.save(evento);
    }

    public List<Evento> eventosTerminados() {
        return eventoRepository.findByEstado(EstadoEvento.TERMINADO);
    }

    public List<Evento> eventosCancelados() {
        return eventoRepository.findByEstado(EstadoEvento.CANCELADO);
    }
    
    public List<Evento> todosLosEventos() {
        return eventoRepository.findAll();
    }
    
    public void cancelarEvento(int id) {
        Evento evento = buscarPorId(id);
        evento.setEstado(EstadoEvento.CANCELADO);
        eventoRepository.save(evento);
    }
}