package com.tesis.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class VentaPromoDTO {
    private int idVenta;
    private ClientDTO cliente;
    private List<DetalleVentaPromoDTO> promociones;
    private int metodoPago;
    private LocalDateTime fechaMovimiento;
    private double totalFinal;


    public VentaPromoDTO(int idVenta, ClientDTO cliente, List<DetalleVentaPromoDTO> promociones, int metodoPago, LocalDateTime fechaMovimiento, double totalFinal) {
        this.idVenta = idVenta;
        this.cliente = cliente;
        this.promociones = promociones;
        this.metodoPago = metodoPago;
        this.fechaMovimiento = fechaMovimiento;
        this.totalFinal = totalFinal;
    }
    public VentaPromoDTO(){

    }

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

    public List<DetalleVentaPromoDTO> getPromociones() {
        return promociones;
    }

    public void setPromociones(List<DetalleVentaPromoDTO> promociones) {
        this.promociones = promociones;
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
