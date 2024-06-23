package com.tesis.backend.controller;

import com.tesis.backend.model.MovimientoInventario;
import com.tesis.backend.service.MovimientoInventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tesis.backend.dto.MovimientoInventarioDTO;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
public class MovimientoInventarioController {

    @Autowired
    private MovimientoInventarioService movimientoInventarioService;

    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<MovimientoInventarioDTO>> getMovimientosByProducto(@PathVariable Integer idProducto) {
        List<MovimientoInventarioDTO> movimientos = movimientoInventarioService.getMovimientosByProductoId(idProducto);
        return ResponseEntity.ok(movimientos);
    }

}
