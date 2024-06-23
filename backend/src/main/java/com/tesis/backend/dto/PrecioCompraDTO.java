package com.tesis.backend.dto;

import java.time.LocalDateTime;

public class PrecioCompraDTO {
    private Long productoId;
    private int usuarioId;
    private int estado;
    private Double precioActual;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFinal;

    // Getters and Setters
    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public Double getPrecioActual() {
        return precioActual;
    }

    public void setPrecioActual(Double precioActual) {
        this.precioActual = precioActual;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(LocalDateTime fechaFinal) {
        this.fechaFinal = fechaFinal;
    }
}
