package com.tesis.backend.repository;
import com.tesis.backend.model.Venta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
public interface VentasRepository extends JpaRepository<Venta, Integer> {
    @Query("SELECT v FROM Venta v WHERE v.fechaVenta BETWEEN :startOfDay AND :endOfDay")
    List<Venta> findVentasDelDia(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

}

