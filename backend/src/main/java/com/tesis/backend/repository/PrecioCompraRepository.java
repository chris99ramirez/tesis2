package com.tesis.backend.repository;

import com.tesis.backend.model.PrecioCompra;
import com.tesis.backend.model.PrecioVenta;
import com.tesis.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrecioCompraRepository extends JpaRepository<PrecioCompra, Integer> {
    List<PrecioCompra> findByProducto_IdProductoOrderByFechaInicioDesc(Integer idProducto);

    PrecioCompra findByProductoAndEstado(Product producto, Integer estado);

}
