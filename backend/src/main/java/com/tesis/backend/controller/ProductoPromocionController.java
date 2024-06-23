package com.tesis.backend.controller;

import com.tesis.backend.model.ProductoPromocion;
import com.tesis.backend.service.ProductoPromocionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productoPromocion")
public class ProductoPromocionController {

    @Autowired
    private ProductoPromocionService productoPromocionService;

    @GetMapping("/{idPromocion}")
    public ResponseEntity<List<ProductoPromocion>> getProductoPromocionByPromocionId(@PathVariable int idPromocion) {
        List<ProductoPromocion> productos = productoPromocionService.getProductoPromocionByPromocionId(idPromocion);
        if (productos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/promociones/{idProducto}")
    public ResponseEntity<List<Double>> getActivePromocionPrecios(@PathVariable Integer idProducto) {
        List<Double> precios = productoPromocionService.getActivePromocionPrecios(idProducto);
        return ResponseEntity.ok(precios);
    }
}
