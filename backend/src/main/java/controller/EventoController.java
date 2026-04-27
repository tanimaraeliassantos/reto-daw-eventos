package controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import entities.Evento;
import service.EventoService;
import dto.EventoDTO;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private EventoService eventoService;

    
    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    

    @GetMapping("/activos")
    public List<Evento> activos() {
        return eventoService.eventosActivos();
    }

    @GetMapping("/destacados")
    public List<Evento> destacados() {
        return eventoService.eventosDestacados();
    }

    @GetMapping("/tipo/{idTipo}")
    public List<Evento> porTipo(@PathVariable int idTipo) {
        return eventoService.eventosPorTipo(idTipo);
    }

    @GetMapping("/{id}")
    public Evento detalle(@PathVariable int id) {
        return eventoService.buscarPorId(id);
    }

    

    @PostMapping
    public Evento crear(@RequestBody EventoDTO dto) {
        return eventoService.crearEvento(dto);
    }

    @PutMapping("/{id}")
    public Evento editar(@PathVariable int id, @RequestBody EventoDTO dto) {
        return eventoService.editarEvento(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelar(@PathVariable int id) {
        eventoService.cancelarEvento(id);
        return ResponseEntity.ok("Evento cancelado");
    }
}