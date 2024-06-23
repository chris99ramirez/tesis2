package com.tesis.backend.controller;
import com.tesis.backend.service.ProveedorService;

import com.tesis.backend.model.Proveedor;
import com.tesis.backend.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/proveedor")
@CrossOrigin(origins = "http://localhost:3000") // Permite acceso desde el frontend en localhost:3000
public class ProveedorController {

    @Autowired
    private ProveedorRepository proveedorRepository;
    @Autowired
    private ProveedorService proveedorService;
    @GetMapping
    public List<Proveedor> getAllMarcas() {
        return proveedorRepository.findAll();
    }
    @PostMapping
    public ResponseEntity<Proveedor> createProveedor(@RequestBody Proveedor proveedor) {
        Proveedor nuevoProveedor = proveedorService.saveProveedor(proveedor);
        return ResponseEntity.ok(nuevoProveedor);
    }
}
