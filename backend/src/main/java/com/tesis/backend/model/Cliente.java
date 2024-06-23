package com.tesis.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
@Entity
@Table(name = "clientes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCliente")
    private int idCliente;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "DNI")
    private int DNI;
    @Column(name = "celular")
    private int celular;

    // Constructor
    public Cliente(int idCliente, String nombre, int DNI, int celular) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.DNI = DNI;
        this.celular = celular;
    }
    public Cliente() {

    }

    // Getters and Setters
    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getDNI() {
        return DNI;
    }

    public void setDNI(int DNI) {
        this.DNI = DNI;
    }

    public int getCelular() {
        return celular;
    }

    public void setCelular(int celular) {
        this.celular = celular;
    }

    // toString method for easy printing
    @Override
    public String toString() {
        return "Clientes{" +
                "idCliente=" + idCliente +
                ", nombre='" + nombre + '\'' +
                ", DNI=" + DNI +
                ", celular=" + celular +
                '}';
    }
}

