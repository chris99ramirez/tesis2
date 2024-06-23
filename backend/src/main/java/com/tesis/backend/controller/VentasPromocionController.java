package com.tesis.backend.controller;

import com.tesis.backend.dto.VentaPromoDTO;
import com.tesis.backend.model.Venta;
import com.tesis.backend.service.VentasPromocionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ventasPromo")
public class VentasPromocionController {

    @Autowired
    private VentasPromocionService ventaPromocionService;

    @PostMapping("/registrarVentaPromocion")
    public ResponseEntity<Venta> registrarVentaPromocion(@RequestBody VentaPromoDTO ventaPromocion) {
        Venta venta = ventaPromocionService.registrarVentaSiNoExiste(ventaPromocion);
        return new ResponseEntity<>(venta, HttpStatus.CREATED);
    }
}
