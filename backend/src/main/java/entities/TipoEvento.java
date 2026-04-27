package entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo")
    private int idTipo;

    private String nombre;
    private String descripcion;
    
	public int getIdTipo() {
		return idTipo;
	}
	public void setIdTipo(int idTipo) {
		this.idTipo = idTipo;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
    
    
    
    
    
}