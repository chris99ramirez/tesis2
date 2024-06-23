package com.tesis.backend.controller;
import com.tesis.backend.service.MarcaService;

import com.tesis.backend.model.Marca;
import com.tesis.backend.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/marcas")
@CrossOrigin(origins = "http://localhost:3000") // Permite acceso desde el frontend en localhost:3000
public class MarcaController {

    @Autowired
    private MarcaRepository MarcaRepository;
    @Autowired
    private MarcaService marcaService;
    @GetMapping
    public List<Marca> getAllMarcas() {
        return MarcaRepository.findAll();
    }
    @PostMapping
    public ResponseEntity<Marca> createMarca(@RequestBody Marca marca) {
        Marca nuevaMarca = marcaService.saveMarca(marca);
        return ResponseEntity.ok(nuevaMarca);
    }
}
