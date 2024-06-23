package com.tesis.backend.controller;

import com.tesis.backend.dto.promocionDTO;
import com.tesis.backend.model.Promocion;
import com.tesis.backend.service.PromocionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/promociones")
@CrossOrigin(origins = "http://localhost:3000")
public class PromocionController {

    @Autowired
    private PromocionService promocionService;

    @PostMapping("/registrar")
    public ResponseEntity<Map<String, String>> registrarPromocion(@RequestBody promocionDTO promocionDTO) {
        Map<String, String> response = new HashMap<>();
        try {
            promocionService.registrarPromocion(promocionDTO);
            response.put("message", "Promoción creada exitosamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Error al crear la promoción: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Promocion>> listarPromociones() {
        List<Promocion> promociones = promocionService.listarPromocionesOrdenadasPorFechaInicio();
        return ResponseEntity.ok(promociones);
    }

    @GetMapping("/detalle/{idPromocion}")
    public ResponseEntity<Promocion> getPromotionById(@PathVariable int idPromocion) {
        Optional<Promocion> promotion = promocionService.getPromotionById(idPromocion);
        return promotion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/actualizarEstado/{idPromocion}")
    public ResponseEntity<Boolean> actualizarEstadoPromocion(@PathVariable int idPromocion) {
        boolean actualizado = promocionService.actualizarEstadoPromocion(idPromocion);
        if (actualizado) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listarCombo/{tipoPromocion}")
    public List<Promocion> getPromocionesByTipo(@PathVariable int tipoPromocion) {
        return promocionService.getPromocionesByTipoPromocion(tipoPromocion);
    }
}
