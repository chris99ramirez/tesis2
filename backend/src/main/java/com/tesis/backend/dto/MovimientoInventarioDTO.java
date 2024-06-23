package com.tesis.backend.dto;

import java.time.LocalDateTime;

public class MovimientoInventarioDTO {
    private Integer idMovimiento;
    private Integer tipoMovimiento;
    private Double cantidad;
    private LocalDateTime fechaMovimiento;

    public MovimientoInventarioDTO() {
    }

    public MovimientoInventarioDTO(Integer idMovimiento, Integer tipoMovimiento, Double cantidad, LocalDateTime fechaMovimiento) {
        this.idMovimiento = idMovimiento;
        this.tipoMovimiento = tipoMovimiento;
        this.cantidad = cantidad;
        this.fechaMovimiento = fechaMovimiento;
    }

    public Integer getIdMovimiento() {
        return idMovimiento;
    }

    public void setIdMovimiento(Integer idMovimiento) {
        this.idMovimiento = idMovimiento;
    }

    public Integer getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(Integer tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public Double getCantidad() {
        return cantidad;
    }

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }

    public LocalDateTime getFechaMovimiento() {
        return fechaMovimiento;
    }

    public void setFechaMovimiento(LocalDateTime fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento;
    }
}
