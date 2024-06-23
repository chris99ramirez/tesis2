package com.tesis.backend.controller;

import com.tesis.backend.model.Unidad;
import com.tesis.backend.repository.UnidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/unidad")
@CrossOrigin(origins = "http://localhost:3000") // Permite acceso desde el frontend en localhost:3000
public class UnidadController {

    @Autowired
    private UnidadRepository UnidadRepository;

    @GetMapping
    public List<Unidad> getAllUnidads() {
        return UnidadRepository.findAll();
    }
}
