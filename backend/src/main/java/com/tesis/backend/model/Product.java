package com.tesis.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProducto")
    private Long idProducto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idMarca", referencedColumnName = "idMarca")
    private Marca marca;

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProveedor", referencedColumnName = "idProveedor")
    private Proveedor proveedor;

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCategoria", referencedColumnName = "idCategoria")
    private Categoria categoria;

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUnidad", referencedColumnName = "idUnidad")
    private Unidad unidad;

    public Unidad getUnidad() {
        return unidad;
    }

    public void setUnidad(Unidad unidad) {
        this.unidad = unidad;
    }

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precioVenta")
    private Double precioVenta;

    @Column(name = "stock")
    private Double stock;

    @Column(name = "estado")
    private Integer estado;

    @Column(name = "precioCompra")
    private Double precioCompra;

    @Column(name = "stockMinimo")
    private Double stockMinimo;


    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(Double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public Double getStock() {
        return stock;
    }

    public void setStock(Double stock) {
        this.stock = stock;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public Double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public Double getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(Double stockMinimo) {
        this.stockMinimo = stockMinimo;
    }
}
