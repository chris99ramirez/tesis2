package com.tesis.backend.service;

import com.tesis.backend.dto.PrecioCompraDTO;
import com.tesis.backend.dto.PrecioVentaDTO;
import com.tesis.backend.model.PrecioCompra;
import com.tesis.backend.model.PrecioVenta;
import com.tesis.backend.model.Product;
import com.tesis.backend.model.Usuario;
import com.tesis.backend.repository.PrecioCompraRepository;
import com.tesis.backend.repository.PrecioVentaRepository;
import com.tesis.backend.repository.ProductRepository;
import com.tesis.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrecioCompraService {

    @Autowired
    private PrecioCompraRepository precioCompraRepository;

    public List<PrecioCompra> getPrecioCompraByProductoId(Integer idProducto) {
        return precioCompraRepository.findByProducto_IdProductoOrderByFechaInicioDesc(idProducto);
    }

    @Autowired
    private ProductRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public PrecioCompra savePrecioCompra(PrecioCompraDTO precioCompraDTO) {
        Product producto = productoRepository.findById(precioCompraDTO.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto not found"));
        Usuario usuario = usuarioRepository.findById(precioCompraDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario not found"));

        PrecioCompra previousPrecioCompra = precioCompraRepository.findByProductoAndEstado(producto, 1);

        PrecioCompra precioCompra = new PrecioCompra();
        precioCompra.setProducto(producto);
        precioCompra.setUsuario(usuario);
        precioCompra.setEstado(precioCompraDTO.getEstado());
        precioCompra.setPrecioActual(precioCompraDTO.getPrecioActual());
        precioCompra.setFechaInicio(precioCompraDTO.getFechaInicio());
        precioCompra.setFechaFinal(precioCompraDTO.getFechaFinal());

        if (previousPrecioCompra != null) {
            previousPrecioCompra.setEstado(0);
            previousPrecioCompra.setFechaFinal(precioCompraDTO.getFechaInicio());
            precioCompraRepository.save(previousPrecioCompra);
        }

        return precioCompraRepository.save(precioCompra);
    }
}
