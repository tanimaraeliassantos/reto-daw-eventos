package dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class EventoDTO {

    private String nombre;
    private String descripcion;
    private Date fechaInicio;
    private int duracion;
    private String direccion;
    private int aforoMaximo;
    private int minimoAsistencia;
    private BigDecimal precio;
    private int idTipo;
    
    
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
	public Date getFechaInicio() {
		return fechaInicio;
	}
	public void setFechaInicio(Date fechaInicio) {
		this.fechaInicio = fechaInicio;
	}
	public int getDuracion() {
		return duracion;
	}
	public void setDuracion(int duracion) {
		this.duracion = duracion;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public int getAforoMaximo() {
		return aforoMaximo;
	}
	public void setAforoMaximo(int aforoMaximo) {
		this.aforoMaximo = aforoMaximo;
	}
	public int getMinimoAsistencia() {
		return minimoAsistencia;
	}
	public void setMinimoAsistencia(int minimoAsistencia) {
		this.minimoAsistencia = minimoAsistencia;
	}
	public BigDecimal getPrecio() {
		return precio;
	}
	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}
	public int getIdTipo() {
		return idTipo;
	}
	public void setIdTipo(int idTipo) {
		this.idTipo = idTipo;
	}


    


}

