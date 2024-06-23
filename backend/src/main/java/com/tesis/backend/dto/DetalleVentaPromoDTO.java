package com.tesis.backend.dto;

import com.tesis.backend.model.Product;
import com.tesis.backend.model.Promocion;

public class DetalleVentaPromoDTO {

    private Promocion promocion;
    private double cantidad;

    private int idPromocion;


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

    public int getIdPromocion() {
        return idPromocion;
    }

    public void setIdPromocion(int idPromocion) {
        this.idPromocion = idPromocion;
    }
}
