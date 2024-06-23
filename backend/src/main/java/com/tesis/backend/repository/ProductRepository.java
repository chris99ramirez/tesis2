package com.tesis.backend.repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import com.tesis.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN FETCH p.proveedor pr JOIN FETCH p.marca m JOIN FETCH p.categoria c JOIN FETCH p.unidad u ORDER BY p.nombre ASC")
    List<Product> findAllWithDetails();

    @Query("SELECT p, COUNT(d) as ventaCount " +
            "FROM Product p LEFT JOIN DetalleVenta d ON p.idProducto = d.producto.idProducto " +
            "GROUP BY p " +
            "ORDER BY ventaCount DESC")
    List<Object[]> findAllProductsWithVentaCount();
}
