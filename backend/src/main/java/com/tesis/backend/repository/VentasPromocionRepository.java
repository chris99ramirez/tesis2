package com.tesis.backend.repository;
import com.tesis.backend.model.DetalleVenta;
import com.tesis.backend.model.VentasPromocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VentasPromocionRepository extends JpaRepository<VentasPromocion, Long> {
    List<VentasPromocion> findByVenta_IdVentas(int idVentas);
}
