package com.example.AstroReserva.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.AstroReserva.dto.EventoDTO;
import com.example.AstroReserva.entities.Evento;
import com.example.AstroReserva.entities.Usuario;
import com.example.AstroReserva.service.EventoService;
import com.example.AstroReserva.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final EventoService eventoService;
    private final UsuarioService usuarioService;

    public AdminController(EventoService eventoService, UsuarioService usuarioService) {
        this.eventoService = eventoService;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuarios")
    public List<Usuario> usuarios() {
        return usuarioService.listarUsuarios();
    }

    @PostMapping("/eventos/alta")
    public ResponseEntity<Evento> alta(@RequestBody EventoDTO dto) {
        return ResponseEntity.status(201).body(eventoService.crearEvento(dto));
    }

    @PutMapping("/eventos/editar/{id}")
    public ResponseEntity<Evento> editar(@PathVariable int id, @RequestBody EventoDTO dto) {
        return ResponseEntity.ok(eventoService.editarEvento(id, dto));
    }

    @PutMapping("/eventos/cancelar/{id}")
    public ResponseEntity<String> cancelar(@PathVariable int id) {
        eventoService.cancelarEvento(id);
        return ResponseEntity.ok("Evento cancelado");
    }

    @GetMapping("/eventos")
    public List<Evento> todosEventos() {
        return eventoService.todosLosEventos();
    }
}