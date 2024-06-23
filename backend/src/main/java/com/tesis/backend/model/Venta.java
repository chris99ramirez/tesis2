package com.tesis.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;
@Entity
@Table(name = "ventas")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idVentas")
    private int idVentas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCliente")
    private Cliente cliente;
    @Column(name = "idMetodoPago")
    private int idMetodoPago;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
    @Column(name = "fechaVenta")
    private LocalDateTime fechaVenta;
    @Column(name = "totalFinal")
    private double totalFinal;
    @Column(name = "estado")
    private int estado;

    // Constructor
    public Venta(int idVentas, Cliente cliente, int idMetodoPago, Usuario usuario, LocalDateTime fechaVenta, double totalFinal, int estado) {
        this.idVentas = idVentas;
        this.setCliente(cliente);
        this.idMetodoPago = idMetodoPago;
        this.setUsuario(usuario);
        this.fechaVenta = fechaVenta;
        this.totalFinal = totalFinal;
        this.estado = estado;
    }

    public Venta() {
    }

    // Getters and Setters
    public int getIdVentas() {
        return idVentas;
    }

    public void setIdVentas(int idVentas) {
        this.idVentas = idVentas;
    }



    public int getIdMetodoPago() {
        return idMetodoPago;
    }

    public void setIdMetodoPago(int idMetodoPago) {
        this.idMetodoPago = idMetodoPago;
    }



    public LocalDateTime getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(LocalDateTime fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public double getTotalFinal() {
        return totalFinal;
    }

    public void setTotalFinal(double totalFinal) {
        this.totalFinal = totalFinal;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }


    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
