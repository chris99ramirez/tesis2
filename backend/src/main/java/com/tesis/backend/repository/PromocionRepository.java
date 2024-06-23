package com.tesis.backend.repository;

import com.tesis.backend.model.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.time.LocalDate;
@Repository
public interface PromocionRepository extends JpaRepository<Promocion, Integer> {
    List<Promocion> findAllByOrderByFechaInicioDesc();
    List<Promocion> findByTipoPromocionAndFechaInicioBeforeAndFechaFinAfterAndEstado(
            int tipoPromocion,Date fechaInicio, Date fechaFin, int estado);
}