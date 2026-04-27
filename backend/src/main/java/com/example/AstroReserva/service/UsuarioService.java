package com.example.AstroReserva.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.AstroReserva.entities.Perfil;
import com.example.AstroReserva.entities.Usuario;
import com.example.AstroReserva.repository.PerfilRepository;
import com.example.AstroReserva.repository.UsuarioRepository;
import com.example.AstroReserva.security.JwtUtil;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final PerfilRepository perfilRepository;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder,
                          PerfilRepository perfilRepository) {
        this.usuarioRepository = usuarioRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.perfilRepository = perfilRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        List<SimpleGrantedAuthority> authorities = usuario.getPerfiles().stream()
                .map(p -> new SimpleGrantedAuthority(p.getNombre()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                usuario.getUsername(),
                usuario.getPassword(),
                authorities
        );
    }

    public String login(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no existe"));

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Password incorrecto");
        }

        return jwtUtil.generateToken(username);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public void registrar(String username, String password, String email) {
        if (usuarioRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Usuario ya existe");
        }

        Perfil perfil = perfilRepository.findByNombre("ROLE_CLIENTE")
                .orElseThrow(() -> new RuntimeException("Perfil no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setEmail(email);
        usuario.setEnabled(1);
        usuario.setFechaRegistro(new Date());
        usuario.setPerfiles(List.of(perfil));

        usuarioRepository.save(usuario);
    }
}