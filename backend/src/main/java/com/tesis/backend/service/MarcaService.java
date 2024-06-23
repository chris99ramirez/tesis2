package com.tesis.backend.service;

import com.tesis.backend.model.Marca;
import com.tesis.backend.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    public Marca saveMarca(Marca marca) {
        return marcaRepository.save(marca);
    }
    public Marca findById(Integer id) {
        return marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con ID: " + id));
    }
}
