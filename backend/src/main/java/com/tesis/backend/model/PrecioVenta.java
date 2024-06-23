package com.tesis.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "precioVenta")
public class PrecioVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPrecioVenta")
    private Integer idPrecioVenta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    private Product producto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @Column(name = "estado")
    private Integer estado;

    @Column(name = "precioActual")
    private Double precioActual;

    @Column(name = "fechaInicio")
    private LocalDateTime fechaInicio;

    @Column(name = "fechaFinal")
    private LocalDateTime fechaFinal;


    public Integer getIdPrecioVenta() {
        return idPrecioVenta;
    }

    public void setIdPrecioVenta(Integer idPrecioVenta) {
        this.idPrecioVenta = idPrecioVenta;
    }

    public Product getProducto() {
        return producto;
    }

    public void setProducto(Product producto) {
        this.producto = producto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
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

    public PrecioVenta() {
    }

    public PrecioVenta(Integer idPrecioVenta, Product producto, Usuario usuario, Integer estado, Double precioActual, LocalDateTime fechaInicio,LocalDateTime fechaFinal) {
        this.idPrecioVenta = idPrecioVenta;
        this.producto = producto;
        this.usuario = usuario;
        this.estado=estado;
        this.precioActual=precioActual;
        this.fechaInicio=fechaInicio;
        this.fechaFinal=fechaFinal;
    }
}
