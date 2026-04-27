package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import entities.TipoEvento;

public interface TipoEventoRepository extends JpaRepository<TipoEvento, Integer> {
}