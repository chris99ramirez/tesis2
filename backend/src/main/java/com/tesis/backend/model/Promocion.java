package com.tesis.backend.model;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "promocion")
public class Promocion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPromocion")
    private int idPromocion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
    @Column(name = "tipoPromocion")
    private int tipoPromocion;
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "fechaInicio")
    private Date fechaInicio;

    @Column(name = "fechaFin")
    private Date fechaFin;
    @Column(name = "valorDescuento")
    private double valorDescuento;
    @Column(name = "stock")
    private double stock;
    @Column(name = "precio")
    private double precio;
    @Column(name = "estado")
    private int estado;
    @Column(name = "unidadStock")
    private String unidadStock;

    // Constructor
    public Promocion(int idPromocion,  Usuario usuario, int tipoPromocion, String descripcion, Date fechaInicio, Date fechaFin, double valorDescuento, double stock, double precio, int estado, String unidadStock) {
        this.idPromocion = idPromocion;
        this.usuario = usuario;
        this.tipoPromocion = tipoPromocion;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.valorDescuento = valorDescuento;
        this.stock = stock;
        this.precio = precio;
        this.estado = estado;
        this.unidadStock = unidadStock;
    }
    public Promocion() {

    }
    // Getters y Setters
    public int getIdPromocion() {
        return idPromocion;
    }

    public void setIdPromocion(int idPromocion) {
        this.idPromocion = idPromocion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


    public int getTipoPromocion() {
        return tipoPromocion;
    }

    public void setTipoPromocion(int tipoPromocion) {
        this.tipoPromocion = tipoPromocion;
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

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public double getValorDescuento() {
        return valorDescuento;
    }

    public void setValorDescuento(double valorDescuento) {
        this.valorDescuento = valorDescuento;
    }

    public double getStock() {
        return stock;
    }

    public void setStock(double stock) {
        this.stock = stock;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public String getUnidadStock() {
        return unidadStock;
    }

    public void setUnidadStock(String unidadStock) {
        this.unidadStock = unidadStock;
    }
}
