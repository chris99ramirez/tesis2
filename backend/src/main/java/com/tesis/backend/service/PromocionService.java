package com.tesis.backend.service;

import com.tesis.backend.dto.productoPromocionDTO;
import com.tesis.backend.dto.promocionDTO;
import com.tesis.backend.model.Product;
import com.tesis.backend.model.ProductoPromocion;
import com.tesis.backend.model.Promocion;
import com.tesis.backend.model.Usuario;
import com.tesis.backend.repository.ProductRepository;
import com.tesis.backend.repository.ProductoPromocionRepository;
import com.tesis.backend.repository.PromocionRepository;
import com.tesis.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PromocionService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PromocionRepository promocionRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductoPromocionRepository productoPromocionRepository;
    // Método para registrar una promoción
    public void registrarPromocion(promocionDTO promocionDTO) {
        Usuario usuario = usuarioRepository.findById(1).orElseThrow(() -> new RuntimeException("User not found with id " + 1));

        Promocion promocion = new Promocion();
        promocion.setEstado(1);
        promocion.setUsuario(usuario);
        promocion.setDescripcion(promocionDTO.getDescripcion());
        promocion.setValorDescuento(promocionDTO.getDescuento());
        promocion.setFechaInicio(convertStringToDate(promocionDTO.getFechaInicio()));
        promocion.setFechaFin(convertStringToDate(promocionDTO.getFechaFinal()));
        promocion.setPrecio(promocionDTO.getPrecio());
        promocion.setStock(promocionDTO.getStock());
        promocion.setUnidadStock(promocionDTO.getStockUnidad());
        promocion.setTipoPromocion(promocionDTO.getTipo());

        Promocion savedPromocion = promocionRepository.save(promocion);



        int promocionId = promocion.getIdPromocion();

        for (productoPromocionDTO productoDTO : promocionDTO.getProductos()) {
            Product product = productRepository.findById((long)productoDTO.getIdProducto()).orElseThrow(() -> new RuntimeException("Product not found with id "));

            ProductoPromocion productoPromocion = new ProductoPromocion();
            productoPromocion.setProducto(product);
            productoPromocion.setPromocion(savedPromocion);
            productoPromocion.setCantidad(productoDTO.getCantidad());

           productoPromocionRepository.save(productoPromocion);
        }
    }

    // Método para convertir String a Date
    private Date convertStringToDate(String dateString) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return formatter.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
    public List<Promocion> listarPromocionesOrdenadasPorFechaInicio() {
        return promocionRepository.findAllByOrderByFechaInicioDesc();
    }

    public Optional<Promocion> getPromotionById(int idPromocion) {
        return promocionRepository.findById(idPromocion);
    }

    public boolean actualizarEstadoPromocion(int idPromocion) {
        Optional<Promocion> promocionOpt = promocionRepository.findById(idPromocion);
        if (promocionOpt.isPresent()) {
            Promocion promocion = promocionOpt.get();
            if (promocion.getEstado() == 1) {
                promocion.setEstado(0);
                promocionRepository.save(promocion);
                return true;
            }
        }
        return false;
    }

    public List<Promocion> getPromocionesByTipoPromocion(int tipoPromocion) {
        Date currentDate = new Date();
        return promocionRepository.findByTipoPromocionAndFechaInicioBeforeAndFechaFinAfterAndEstado(
                tipoPromocion, currentDate, currentDate, 1);
    }
}
