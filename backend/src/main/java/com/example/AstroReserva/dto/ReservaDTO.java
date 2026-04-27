package com.example.AstroReserva.dto;

import lombok.Data;

@Data
public class ReservaDTO {

    private int idEvento;
    private int cantidad;
	public int getIdEvento() {
		return idEvento;
	}
	public void setIdEvento(int idEvento) {
		this.idEvento = idEvento;
	}
	public int getCantidad() {
		return cantidad;
	}
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
    
    
    
    
}