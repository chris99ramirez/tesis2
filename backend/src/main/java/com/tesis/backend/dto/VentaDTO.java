package com.tesis.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class VentaDTO {
     private  int idVenta;
    private ClientDTO cliente; // Agregar este campo
    private int metodoPago;
    private LocalDateTime fechaMovimiento;
    private double totalFinal;
    private List<DetalleVentaDTO> productos;



    public int getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(int metodoPago) {
        this.metodoPago = metodoPago;
    }

    public LocalDateTime getFechaMovimiento() {
        return fechaMovimiento;
    }

    public void setFechaMovimiento(LocalDateTime fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento;
    }

    public double getTotalFinal() {
        return totalFinal;
    }

    public void setTotalFinal(double montoFinal) {
        this.totalFinal = montoFinal;
    }

    public List<DetalleVentaDTO> getProductos() {
        return productos;
    }

    public void setProductos(List<DetalleVentaDTO> productos) {
        this.productos = productos;
    }

    public int getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(int idVenta) {
        this.idVenta = idVenta;
    }

    public ClientDTO getCliente() {
        return cliente;
    }

    public void setCliente(ClientDTO cliente) {
        this.cliente = cliente;
    }
}
