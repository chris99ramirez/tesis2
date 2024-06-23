package com.tesis.backend.service;

import com.tesis.backend.model.ProductoPromocion;
import com.tesis.backend.repository.ProductoPromocionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoPromocionService {

    @Autowired
    private ProductoPromocionRepository productoPromocionRepository;

    public List<ProductoPromocion> getProductoPromocionByPromocionId(int idPromocion) {
        return productoPromocionRepository.findByPromocionIdPromocion(idPromocion);
    }

    public List<Double> getActivePromocionPrecios(Integer idProducto) {
        return productoPromocionRepository.findActivePromocionPrecios(idProducto);
    }
}
