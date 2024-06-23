package com.tesis.backend.repository;
import com.tesis.backend.model.DetalleVenta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleDeVentasRepository extends JpaRepository<DetalleVenta, Integer> {
    List<DetalleVenta> findByVenta_IdVentas(int idVentas);
}
