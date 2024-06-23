package com.tesis.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "precioCompra")
public class PrecioCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPrecioCompra")
    private Integer idPrecioCompra;

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


    public Integer getIdPrecioCompra() {
        return idPrecioCompra;
    }

    public void setIdPrecioCompra(Integer idPrecioCompra) {
        this.idPrecioCompra = idPrecioCompra;
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

    public PrecioCompra() {
    }

    public PrecioCompra(Integer idPrecioCompra, Product producto, Usuario usuario, Integer estado, Double precioActual, LocalDateTime fechaInicio,LocalDateTime fechaFinal) {
        this.idPrecioCompra = idPrecioCompra;
        this.producto = producto;
        this.usuario = usuario;
        this.estado=estado;
        this.precioActual=precioActual;
        this.fechaInicio=fechaInicio;
        this.fechaFinal=fechaFinal;
    }
}
