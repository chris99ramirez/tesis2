package com.tesis.backend.repository;

import com.tesis.backend.model.MovimientoInventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.tesis.backend.dto.MovimientoInventarioDTO;
import java.util.List;

@Repository
public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Integer> {
    @Query("SELECT new com.tesis.backend.dto.MovimientoInventarioDTO(m.idMovimiento, m.tipoMovimiento, m.cantidad, m.fechaMovimiento) FROM MovimientoInventario m WHERE m.producto.idProducto = :idProducto ORDER BY m.fechaMovimiento DESC")
    List<MovimientoInventarioDTO> findMovimientosByProductoId(Integer idProducto);
}
