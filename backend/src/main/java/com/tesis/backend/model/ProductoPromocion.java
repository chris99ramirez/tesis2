package com.tesis.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productoPromocion")
public class ProductoPromocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProductoPromocion")
    private int idProductoPromocion;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    private Product producto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPromocion")
    private Promocion promocion;
    private double cantidad;

    // Constructor
    public ProductoPromocion(int idProductoPromocion,Product producto, Promocion promocion, double cantidad) {
        this.setProducto(producto);
        this.setPromocion(promocion);
        this.cantidad = cantidad;
        this.idProductoPromocion=idProductoPromocion;
    }
    public ProductoPromocion() {

    }


    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public Product getProducto() {
        return producto;
    }

    public void setProducto(Product producto) {
        this.producto = producto;
    }

    public Promocion getPromocion() {
        return promocion;
    }

    public void setPromocion(Promocion promocion) {
        this.promocion = promocion;
    }

    public int getIdProductoPromocion() {
        return idProductoPromocion;
    }

    public void setIdProductoPromocion(int idProductoPromocion) {
        this.idProductoPromocion = idProductoPromocion;
    }
}

