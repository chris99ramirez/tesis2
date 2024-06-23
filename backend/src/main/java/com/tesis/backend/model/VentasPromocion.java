package com.tesis.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "VentasPromocion")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class VentasPromocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idVentasPromocion")
    private int idVentasPromocion;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idVentas")
    private Venta venta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPromocion")
    private Promocion promocion;
    private double cantidad;

    // Constructor
    public VentasPromocion(int idVentasPromocion, Venta venta, Promocion promocion, double cantidad) {
        this.setIdVentasPromocion(idVentasPromocion);
        this.setVenta(venta);
        this.setPromocion(promocion);
        this.setCantidad(cantidad);
    }
    public VentasPromocion() {
    }

    public int getIdVentasPromocion() {
        return idVentasPromocion;
    }

    public void setIdVentasPromocion(int idVentasPromocion) {
        this.idVentasPromocion = idVentasPromocion;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Promocion getPromocion() {
        return promocion;
    }

    public void setPromocion(Promocion promocion) {
        this.promocion = promocion;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }
}

