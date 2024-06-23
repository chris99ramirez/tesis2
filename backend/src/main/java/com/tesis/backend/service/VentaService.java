package com.tesis.backend.service;
import com.tesis.backend.dto.ClientDTO;
import com.tesis.backend.dto.DetalleVentaDTO;
import com.tesis.backend.model.*;
import com.tesis.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.tesis.backend.dto.VentaDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VentaService {

    @Autowired
    private ClientesRepository clientesRepository;
    @Autowired
    private  MovimientoInventarioRepository movimientoInventarioRepository;
    @Autowired
    private VentasRepository ventasRepository;

    @Autowired
    private DetalleDeVentasRepository detalleDeVentasRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private VentasPromocionRepository ventasPromocionRepository;
    @Transactional
    public ResponseEntity<Venta> registrarVenta(VentaDTO ventaDTO) {
        Cliente cliente = clientesRepository.findByDNI(ventaDTO.getCliente().getDni()).orElseGet(() -> {
                    ClientDTO clienteDTO = ventaDTO.getCliente();
                    Cliente nuevoCliente = new Cliente();
                    nuevoCliente.setNombre(clienteDTO.getNombre());
                    nuevoCliente.setDNI(clienteDTO.getDni());
                    nuevoCliente.setCelular(clienteDTO.getTelefono());
                    return clientesRepository.save(nuevoCliente);
                });
        Usuario usuario = usuarioRepository.findById(1).orElseThrow(() -> new RuntimeException("User not found with id " + 1));

        Venta venta = new Venta(
                0,
                cliente,
                ventaDTO.getMetodoPago(),
                usuario,
                ventaDTO.getFechaMovimiento(),
                ventaDTO.getTotalFinal(),
                1
        );
        System.out.println("Venta antes de guardar: " + venta);
        ventasRepository.save(venta);

        for (DetalleVentaDTO producto : ventaDTO.getProductos()) {
            Product product = productRepository.findById((long)producto.getIdProducto()).orElseThrow(() -> new RuntimeException("Product not found with id " +producto.getProducto().getIdProducto()));
            DetalleVenta detalle = new DetalleVenta(
                    0, // idDetalleVentas es autogenerado por la BD
                    venta,
                    product,
                    producto.getCantidad()
            );
            detalleDeVentasRepository.save(detalle);
            product.setStock(product.getStock()-producto.getCantidad());
            productRepository.save(product);

            MovimientoInventario movimiento = new MovimientoInventario();
            movimiento.setProducto(product);
            movimiento.setUsuario(usuario); // Usa el usuario existente
            movimiento.setTipoMovimiento(1);
            movimiento.setCantidad(-producto.getCantidad());
            movimiento.setFechaMovimiento(ventaDTO.getFechaMovimiento());

            movimientoInventarioRepository.save(movimiento);
        }
        return new ResponseEntity<>(venta, HttpStatus.CREATED);
    }
    public List<Venta> obtenerVentasDelDia() {
        ZoneId zoneId = ZoneId.of("UTC-5");

        LocalDate today = LocalDate.now(zoneId);
        ZonedDateTime startOfDay = today.atStartOfDay(zoneId);
        ZonedDateTime endOfDay = today.atTime(LocalTime.MAX).atZone(zoneId);

        LocalDateTime startOfDayLocal = startOfDay.toLocalDateTime();
        LocalDateTime endOfDayLocal = endOfDay.toLocalDateTime();

        return ventasRepository.findVentasDelDia(startOfDayLocal, endOfDayLocal);
    }
    public List<Venta> obtenerVentasPorFecha(LocalDate fecha) {
        ZoneId zoneId = ZoneId.of("UTC-5");

        ZonedDateTime startOfDay = fecha.atStartOfDay(zoneId);
        ZonedDateTime endOfDay = fecha.atTime(LocalTime.MAX).atZone(zoneId);

        LocalDateTime startOfDayLocal = startOfDay.toLocalDateTime();
        LocalDateTime endOfDayLocal = endOfDay.toLocalDateTime();

        return ventasRepository.findVentasDelDia(startOfDayLocal, endOfDayLocal);
    }
    public List<DetalleVenta> obtenerDetallesPorVentaId(int idVentas) {
        return detalleDeVentasRepository.findByVenta_IdVentas(idVentas);
    }
    public List<VentasPromocion> obtenerDetallesPromoPorVentaId(int idVentas) {
        return ventasPromocionRepository.findByVenta_IdVentas(idVentas);
    }
    public void cancelarVenta(int idVentas,Integer idUsuario, LocalDateTime fechaMovimiento) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(() -> new RuntimeException("User not found with id " + 1));

        Optional<Venta> optionalVenta = ventasRepository.findById(idVentas);
        if (optionalVenta.isPresent()) {
            Venta venta = optionalVenta.get();
            venta.setEstado(0); // Seteamos el estado a 0 para cancelar la venta
            ventasRepository.save(venta);
            List<DetalleVenta> productos = obtenerDetallesPorVentaId(venta.getIdVentas());
            // Imprimir la lista de productos
            System.out.println("Productos asociados a la venta con ID " + idVentas + ":");
            if (productos.isEmpty()) {
                System.out.println("La lista de productos está vacía.");
            } else {
                productos.forEach(producto -> System.out.println("Producto: " + producto.getProducto().getNombre() + ", Cantidad: " + producto.getCantidad()));
            }
            for (DetalleVenta producto : productos) {
                Product product = producto.getProducto();
                product.setStock(product.getStock()+producto.getCantidad());
                productRepository.save(product);

                MovimientoInventario movimiento = new MovimientoInventario();
                movimiento.setProducto(product);
                movimiento.setUsuario(usuario); // Usa el usuario existente
                movimiento.setTipoMovimiento(4);
                movimiento.setCantidad(producto.getCantidad());
                movimiento.setFechaMovimiento(fechaMovimiento);

                movimientoInventarioRepository.save(movimiento);

            }
        } else {
            throw new RuntimeException("Venta no encontrada con el ID: " + idVentas);
        }
    }

}
