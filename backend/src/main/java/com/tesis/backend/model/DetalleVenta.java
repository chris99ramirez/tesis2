package com.tesis.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "detalleVentas")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDetalleVentas")
    private int idDetalleVentas;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idVentas")
    private Venta venta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    private Product producto;
    private double cantidad;

    // Constructor
    public DetalleVenta(int idDetalleVentas, Venta venta, Product producto, double cantidad) {
        this.idDetalleVentas = idDetalleVentas;
        this.setVenta(venta);
        this.setProducto(producto);
        this.cantidad = cantidad;
    }
    public DetalleVenta() {
    }
    // Getters and Setters
    public int getIdDetalleVentas() {
        return idDetalleVentas;
    }

    public void setIdDetalleVentas(int idDetalleVentas) {
        this.idDetalleVentas = idDetalleVentas;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }


    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Product getProducto() {
        return producto;
    }

    public void setProducto(Product producto) {
        this.producto = producto;
    }
}

