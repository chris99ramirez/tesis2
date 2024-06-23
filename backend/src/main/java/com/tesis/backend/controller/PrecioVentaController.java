package com.tesis.backend.controller;

import com.tesis.backend.dto.PrecioVentaDTO;
import com.tesis.backend.model.PrecioVenta;
import com.tesis.backend.service.PrecioVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/precioVenta")
public class PrecioVentaController {

    @Autowired
    private PrecioVentaService precioVentaService;

    @GetMapping("/producto/{idProducto}")
    public List<PrecioVenta> getPrecioVentasByProductoId(@PathVariable Integer idProducto) {
        return precioVentaService.getPrecioVentasByProductoId(idProducto);
    }

    @PostMapping("/register")
    public ResponseEntity<PrecioVenta> registerPrecioVenta(@RequestBody PrecioVentaDTO precioVentaDTO) {
        PrecioVenta savedPrecioVenta = precioVentaService.savePrecioVenta(precioVentaDTO);
        return ResponseEntity.ok(savedPrecioVenta);
    }
    @PostMapping("/register/promo")
    public ResponseEntity<PrecioVenta> registerPrecioVentaPromo(@RequestBody PrecioVentaDTO precioVentaDTO) {
        PrecioVenta savedPrecioVenta = precioVentaService.savePrecioVentaPromo(precioVentaDTO);
        return ResponseEntity.ok(savedPrecioVenta);
    }
}
