package com.tesis.backend.controller;

import com.tesis.backend.model.DetalleVenta;
import com.tesis.backend.model.Venta;
import com.tesis.backend.model.VentasPromocion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import  com.tesis.backend.service.VentaService;
import  com.tesis.backend.dto.VentaDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping("/registrar")
    public ResponseEntity<Venta> registrarVenta(@RequestBody VentaDTO ventaDTO) {
        return ventaService.registrarVenta(ventaDTO);
    }
    @GetMapping("/hoy")
    public List<Venta> obtenerVentasDelDia() {
        return ventaService.obtenerVentasDelDia();
    }

    @GetMapping("/{idVentas}/detalles")
    public ResponseEntity<List<DetalleVenta>> obtenerDetallesPorVentaId(@PathVariable int idVentas) {
        List<DetalleVenta> detalles = ventaService.obtenerDetallesPorVentaId(idVentas);
        if (detalles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(detalles);
    }
    @GetMapping("/{idVentas}/promo")
    public ResponseEntity<List<VentasPromocion>> obtenerDetallesPromoPorVentaId(@PathVariable int idVentas) {
        List<VentasPromocion> detalles = ventaService.obtenerDetallesPromoPorVentaId(idVentas);
        if (detalles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(detalles);
    }
    @PatchMapping("/cancelar/{id}")
    public ResponseEntity<Map<String, Object>> cancelarVenta(@PathVariable("id") int idVentas,
                                                             @RequestParam Integer idUsuario,
                                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaMovimiento) {
        try {

            ventaService.cancelarVenta(idVentas, idUsuario, fechaMovimiento);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("errMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @GetMapping("/fecha")
    public List<Venta> obtenerVentasPorFecha(@RequestParam String fecha) {
        LocalDate localDate = LocalDate.parse(fecha);  // Asegúrate de que la fecha esté en el formato "yyyy-MM-dd"
        return ventaService.obtenerVentasPorFecha(localDate);
    }
}
