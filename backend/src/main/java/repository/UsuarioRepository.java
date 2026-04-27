package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    Optional<Usuario> findByUsername(String username);
}