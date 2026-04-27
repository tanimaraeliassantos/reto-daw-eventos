package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import entities.EstadoEvento;
import entities.Evento;

public interface EventoRepository extends JpaRepository<Evento, Integer> {

    
    List<Evento> findByEstado(EstadoEvento activo);

    
    List<Evento> findByDestacado(String destacado);

   
    List<Evento> findByTipoIdTipo(int idTipo);
}