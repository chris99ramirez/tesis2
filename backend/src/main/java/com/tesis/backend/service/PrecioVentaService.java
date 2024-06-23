package com.tesis.backend.service;

import com.tesis.backend.dto.PrecioVentaDTO;
import com.tesis.backend.model.PrecioVenta;
import com.tesis.backend.model.Product;
import com.tesis.backend.model.Usuario;
import com.tesis.backend.repository.PrecioVentaRepository;

import com.tesis.backend.repository.ProductRepository;
import com.tesis.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PrecioVentaService {

    @Autowired
    private PrecioVentaRepository precioVentaRepository;

    public List<PrecioVenta> getPrecioVentasByProductoId(Integer idProducto) {
        return precioVentaRepository.findByProducto_IdProductoOrderByFechaInicioDesc(idProducto);
    }

    @Autowired
    private ProductRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public PrecioVenta savePrecioVenta(PrecioVentaDTO precioVentaDTO) {
        Product producto = productoRepository.findById(precioVentaDTO.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto not found"));
        Usuario usuario = usuarioRepository.findById(precioVentaDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario not found"));

        PrecioVenta previousPrecioVenta = precioVentaRepository.findByProductoAndEstado(producto, 1);

        PrecioVenta precioVenta = new PrecioVenta();
        precioVenta.setProducto(producto);
        precioVenta.setUsuario(usuario);
        precioVenta.setEstado(precioVentaDTO.getEstado());
        precioVenta.setPrecioActual(precioVentaDTO.getPrecioActual());
        precioVenta.setFechaInicio(precioVentaDTO.getFechaInicio());
        precioVenta.setFechaFinal(precioVentaDTO.getFechaFinal());

        if (previousPrecioVenta != null) {
            previousPrecioVenta.setEstado(0);
            previousPrecioVenta.setFechaFinal(precioVentaDTO.getFechaInicio());
            precioVentaRepository.save(previousPrecioVenta);
        }

        return precioVentaRepository.save(precioVenta);
    }
    @Transactional
    public PrecioVenta savePrecioVentaPromo(PrecioVentaDTO precioVentaDTO) {
        Product producto = productoRepository.findById(precioVentaDTO.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto not found"));
        Usuario usuario = usuarioRepository.findById(precioVentaDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario not found"));
        PrecioVenta previousPrecioVenta = precioVentaRepository.findByProductoAndEstado(producto, 1);


        PrecioVenta precioVenta = new PrecioVenta();
        precioVenta.setProducto(producto);
        precioVenta.setUsuario(usuario);
        precioVenta.setEstado(precioVentaDTO.getEstado());
        precioVenta.setPrecioActual(precioVentaDTO.getPrecioActual());
        precioVenta.setFechaInicio(precioVentaDTO.getFechaInicio());
        precioVenta.setFechaFinal(precioVentaDTO.getFechaFinal());

        if (previousPrecioVenta != null) {
            previousPrecioVenta.setFechaFinal(precioVentaDTO.getFechaInicio());
            precioVentaRepository.save(previousPrecioVenta);
        }
        return precioVentaRepository.save(precioVenta);
    }

}
