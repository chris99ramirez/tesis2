package com.tesis.backend.service;
import com.tesis.backend.model.Unidad;
import com.tesis.backend.repository.UnidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnidadService {

    @Autowired
    private UnidadRepository unidadRepository;

    public Unidad findById(Integer id) {
        return unidadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unidad no encontrada con ID: " + id));
    }
}
