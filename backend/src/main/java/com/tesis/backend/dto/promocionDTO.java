package com.tesis.backend.dto;
import java.util.List;

public class promocionDTO {
    private String descripcion;
    private double descuento;
    private String fechaInicio;
    private String fechaFinal;
    private double precio;
    private List<productoPromocionDTO> productos;
    private double stock;
    private String stockUnidad;
    private int tipo;

    // Getters y Setters
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(String fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public List<productoPromocionDTO> getProductos() {
        return productos;
    }

    public void setProductos(List<productoPromocionDTO> productos) {
        this.productos = productos;
    }

    public double getStock() {
        return stock;
    }

    public void setStock(double stock) {
        this.stock = stock;
    }

    public String getStockUnidad() {
        return stockUnidad;
    }

    public void setStockUnidad(String stockUnidad) {
        this.stockUnidad = stockUnidad;
    }

    public int getTipo() {
        return tipo;
    }

    public void setTipo(int tipo) {
        this.tipo = tipo;
    }
}