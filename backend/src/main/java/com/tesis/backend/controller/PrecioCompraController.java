package com.tesis.backend.controller;

import com.tesis.backend.dto.PrecioCompraDTO;
import com.tesis.backend.dto.PrecioVentaDTO;
import com.tesis.backend.model.PrecioCompra;
import com.tesis.backend.model.PrecioVenta;
import com.tesis.backend.service.PrecioCompraService;
import com.tesis.backend.service.PrecioVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/precioCompra")
public class PrecioCompraController {

    @Autowired
    private PrecioCompraService precioCompraService;

    @GetMapping("/producto/{idProducto}")
    public List<PrecioCompra> getPrecioComprasByProductoId(@PathVariable Integer idProducto) {
        return precioCompraService.getPrecioCompraByProductoId(idProducto);
    }
    @PostMapping("/register")
    public ResponseEntity<PrecioCompra> registerPrecioVenta(@RequestBody PrecioCompraDTO precioCompraDTO) {
        PrecioCompra savedPrecioCompra = precioCompraService.savePrecioCompra(precioCompraDTO);
        return ResponseEntity.ok(savedPrecioCompra);
    }
}
