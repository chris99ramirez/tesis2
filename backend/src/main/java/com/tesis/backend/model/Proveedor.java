package com.tesis.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@Table(name = "proveedor")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProveedor")
    private int idProveedor;

    @Column(name = "nombre")
    private String nombre;


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(int idMarca) {
        this.idProveedor = idMarca;
    }
}
