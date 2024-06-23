package com.tesis.backend.service;

import com.tesis.backend.dto.DetalleVentaPromoDTO;
import com.tesis.backend.dto.VentaPromoDTO;
import com.tesis.backend.model.*;
import com.tesis.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VentasPromocionService {
    @Autowired
    private  MovimientoInventarioRepository movimientoInventarioRepository;
    @Autowired
    private VentasRepository ventasRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private VentasPromocionRepository ventasPromocionRepository;

    @Autowired
    private ClientesRepository clientesRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PromocionRepository promocionRepository;

    @Autowired
    private ProductoPromocionRepository productoPromocionRepository;

    @Transactional
    public Venta registrarVentaSiNoExiste(VentaPromoDTO ventaPromocionDTO) {
        Optional<Venta> ventaOpt = ventasRepository.findById(ventaPromocionDTO.getIdVenta());
        Usuario usuario = usuarioRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("User not found with id " + 1));
        Venta venta;
        if (ventaOpt.isPresent()) {
            venta = ventaOpt.get();
        } else {
            Cliente cliente = clientesRepository.findByDNI(ventaPromocionDTO.getCliente().getDni())
                    .orElseGet(() -> {
                        Cliente nuevoCliente = new Cliente();
                        nuevoCliente.setNombre(ventaPromocionDTO.getCliente().getNombre());
                        nuevoCliente.setDNI(ventaPromocionDTO.getCliente().getDni());
                        nuevoCliente.setCelular(ventaPromocionDTO.getCliente().getTelefono());
                        return clientesRepository.save(nuevoCliente);
                    });



            venta = new Venta(
                    0,
                    cliente,
                    ventaPromocionDTO.getMetodoPago(),
                    usuario,
                    ventaPromocionDTO.getFechaMovimiento(),
                    ventaPromocionDTO.getTotalFinal(),
                    1
            );
            ventasRepository.save(venta);
        }

        for (DetalleVentaPromoDTO detallePromocion : ventaPromocionDTO.getPromociones()) {
            Promocion promocion = promocionRepository.findById((int) detallePromocion.getIdPromocion())
                    .orElseThrow(() -> new RuntimeException("Promocion not found with id " + detallePromocion.getIdPromocion()));

            VentasPromocion ventasPromocion = new VentasPromocion();
            ventasPromocion.setVenta(venta);
            ventasPromocion.setPromocion(promocion);
            ventasPromocion.setCantidad(detallePromocion.getCantidad());

            ventasPromocionRepository.save(ventasPromocion);

            // Obtener los productos asociados a la promoción
            List<ProductoPromocion> productosPromocion = productoPromocionRepository.findByPromocionIdPromocion(detallePromocion.getIdPromocion());

            // Procesar los productos asociados a la promoción
            for (ProductoPromocion productoPromocion : productosPromocion) {
                Product product = productoPromocion.getProducto();

                product.setStock(product.getStock()-productoPromocion.getCantidad());
                productRepository.save(product);

                MovimientoInventario movimiento = new MovimientoInventario();
                movimiento.setProducto(product);
                movimiento.setUsuario(usuario); // Usa el usuario existente
                movimiento.setTipoMovimiento(1);
                movimiento.setCantidad(-productoPromocion.getCantidad());
                movimiento.setFechaMovimiento(ventaPromocionDTO.getFechaMovimiento());

                movimientoInventarioRepository.save(movimiento);
            }

        }

        return venta;
    }
}
