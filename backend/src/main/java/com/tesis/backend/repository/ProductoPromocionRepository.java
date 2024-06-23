package com.tesis.backend.repository;
import com.tesis.backend.model.ProductoPromocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoPromocionRepository extends JpaRepository<ProductoPromocion, Integer> {
    List<ProductoPromocion> findByPromocionIdPromocion(int idPromocion);

    @Query("SELECT pp.promocion.precio " +
            "FROM ProductoPromocion pp " +
            "WHERE pp.producto.idProducto = :idProducto " +
            "AND pp.promocion.tipoPromocion = 1 " +
            "AND CURRENT_DATE BETWEEN pp.promocion.fechaInicio AND pp.promocion.fechaFin")
    List<Double> findActivePromocionPrecios(@Param("idProducto") Integer idProducto);
}
