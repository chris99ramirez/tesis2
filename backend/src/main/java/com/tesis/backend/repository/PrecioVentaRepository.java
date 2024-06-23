package com.tesis.backend.repository;

import com.tesis.backend.model.PrecioVenta;
import com.tesis.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrecioVentaRepository extends JpaRepository<PrecioVenta, Integer> {
    List<PrecioVenta> findByProducto_IdProductoOrderByFechaInicioDesc(Integer idProducto);
    PrecioVenta findByProductoAndEstado(Product producto, Integer estado);

}
