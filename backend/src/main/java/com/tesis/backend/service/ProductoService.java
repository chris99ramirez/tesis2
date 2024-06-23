package com.tesis.backend.service;
import java.util.List;
import com.tesis.backend.model.Usuario;
import com.tesis.backend.model.MovimientoInventario;
import com.tesis.backend.repository.UsuarioRepository;
import  com.tesis.backend.repository.MovimientoInventarioRepository;
import com.tesis.backend.model.Product;
import com.tesis.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.transaction.annotation.Transactional;
import com.tesis.backend.dto.ProductDTO;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class ProductoService {


    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private  MovimientoInventarioRepository movimientoInventarioRepository;
    @Autowired
    private  UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public ProductDTO findById(Long id) {
        return productRepository.findById(id)
                .map(product -> new ProductDTO(product.getIdProducto(), product.getNombre(), product.getPrecioVenta(), product.getStock(), product.getEstado(), product.getPrecioCompra(), product.getStockMinimo()))
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO, Integer idUsuario, Integer tipoMovimiento, Double cantidad, LocalDateTime fechaMovimiento) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        product.setNombre(productDTO.getNombre());
        product.setPrecioVenta(productDTO.getPrecioVenta());
        product.setStock(productDTO.getStock());
        product.setEstado(productDTO.getEstado());
        product.setPrecioCompra(productDTO.getPrecioCompra());
        product.setStockMinimo(productDTO.getStockMinimo());

        Product updatedProduct = productRepository.save(product);
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("User not found with id " + idUsuario));

        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setProducto(updatedProduct);
        movimiento.setUsuario(usuario); // Usa el usuario existente
        movimiento.setTipoMovimiento(tipoMovimiento);
        movimiento.setCantidad(cantidad);
        movimiento.setFechaMovimiento(fechaMovimiento);

        movimientoInventarioRepository.save(movimiento);

        return new ProductDTO(updatedProduct.getIdProducto(), updatedProduct.getNombre(), updatedProduct.getPrecioVenta(), updatedProduct.getStock(), updatedProduct.getEstado(), updatedProduct.getPrecioCompra(), updatedProduct.getStockMinimo());
    }
    @Transactional
    public ProductDTO disableProduct(Long id){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
        product.setEstado(0);
        Product updatedProduct = productRepository.save(product);
        return new ProductDTO(updatedProduct.getIdProducto(), updatedProduct.getNombre(), updatedProduct.getPrecioVenta(), updatedProduct.getStock(), updatedProduct.getEstado(), updatedProduct.getPrecioCompra(), updatedProduct.getStockMinimo());
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public ProductDTO addStockProduct(Long id, Integer idUsuario, Integer tipoMovimiento, Double cantidad, LocalDateTime fechaMovimiento){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
        product.setStock(product.getStock() + cantidad);
        Product updatedProduct = productRepository.save(product);
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("User not found with id " + idUsuario));

        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setProducto(updatedProduct);
        movimiento.setUsuario(usuario); // Usa el usuario existente
        movimiento.setTipoMovimiento(tipoMovimiento);
        movimiento.setCantidad(cantidad);
        movimiento.setFechaMovimiento(fechaMovimiento);

        movimientoInventarioRepository.save(movimiento);
        return new ProductDTO(updatedProduct.getIdProducto(), updatedProduct.getNombre(), updatedProduct.getPrecioVenta(), updatedProduct.getStock(), updatedProduct.getEstado(), updatedProduct.getPrecioCompra(), updatedProduct.getStockMinimo());
    }

    public List<ProductWithVentaCount> getAllProductsWithVentaCount() {
        List<Object[]> results = productRepository.findAllProductsWithVentaCount();
        return results.stream().map(result -> {
            Product product = (Product) result[0];
            Long ventaCount = (Long) result[1];
            return new ProductWithVentaCount(product, ventaCount);
        }).collect(Collectors.toList());
    }

    public static class ProductWithVentaCount {
        private Product product;
        private Long ventaCount;

        public ProductWithVentaCount(Product product, Long ventaCount) {
            this.product = product;
            this.ventaCount = ventaCount;
        }

        // Getters and Setters
        public Product getProduct() {
            return product;
        }

        public void setProduct(Product product) {
            this.product = product;
        }

        public Long getVentaCount() {
            return ventaCount;
        }

        public void setVentaCount(Long ventaCount) {
            this.ventaCount = ventaCount;
        }
    }
}