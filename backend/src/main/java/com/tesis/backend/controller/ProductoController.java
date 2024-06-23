package com.tesis.backend.controller;

import com.tesis.backend.model.MovimientoInventario;
import com.tesis.backend.model.Product;
import com.tesis.backend.model.Usuario;
import com.tesis.backend.repository.ProductRepository;
import com.tesis.backend.repository.UsuarioRepository;
import com.tesis.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.http.HttpStatus;
import  com.tesis.backend.repository.MovimientoInventarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.bind.annotation.RequestBody;
import com.tesis.backend.dto.ProductDTO;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDateTime;
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Ajusta el puerto y la URL según sea necesario.
public class ProductoController {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private  MovimientoInventarioRepository movimientoInventarioRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductoService productService;
    @Autowired
    private MarcaService MarcaService;

    @Autowired
    private CategoriaService CategoriaService;
    @Autowired
    private ProveedorService ProveedorService;
    @Autowired
    private UnidadService UnidadService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAllWithDetails();
    }

    @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable Long id,
                                    @RequestBody ProductDTO productDTO,
                                    @RequestParam Integer idUsuario,
                                    @RequestParam Integer tipoMovimiento,
                                    @RequestParam Double cantidad,
                                    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaMovimiento) {
        return productService.updateProduct(id, productDTO, idUsuario, tipoMovimiento, cantidad, fechaMovimiento);
    }

    @PatchMapping("/disable/{id}")
    public ResponseEntity<ProductDTO> disableProduct(@PathVariable Long id) {
        ProductDTO disabledProduct = productService.disableProduct(id);
        return ResponseEntity.ok(disabledProduct); // Envía la respuesta con estado 200 y el producto desactivado
    }

    @PatchMapping("/add/{id}")
    public ResponseEntity<ProductDTO> addStockProduct(@PathVariable Long id,
                                                      @RequestParam Integer idUsuario,
                                                      @RequestParam Integer tipoMovimiento,
                                                      @RequestParam Double cantidad,
                                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaMovimiento){
        ProductDTO disabledProduct = productService.addStockProduct(id, idUsuario, tipoMovimiento, cantidad, fechaMovimiento);
        return ResponseEntity.ok(disabledProduct); // Envía la respuesta con estado 200 y el producto desactivado
    }


    @PostMapping
    @Transactional
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        try {
            Product newProduct = new Product();
            newProduct.setNombre(productDTO.getNombre());
            newProduct.setStock(productDTO.getStock());
            newProduct.setPrecioCompra(productDTO.getPrecioCompra());
            newProduct.setPrecioVenta(productDTO.getPrecioVenta());
            newProduct.setStockMinimo(productDTO.getStockMinimo());
            newProduct.setEstado(productDTO.getEstado());

            newProduct.setMarca(MarcaService.findById(productDTO.getIdMarca()));
            newProduct.setCategoria(CategoriaService.findById(productDTO.getIdCategoria()));
            newProduct.setUnidad(UnidadService.findById(productDTO.getIdUnidad()));
            newProduct.setProveedor(ProveedorService.findById(productDTO.getIdProveedor()));
            Product savedProduct = productRepository.save(newProduct);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Esto es importante para poder ver el error en los logs del servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"" + e.getMessage() + "\"}");        }
    }

    @GetMapping("/recomendados")
    public List<ProductoService.ProductWithVentaCount> getAllProductsWithVentaCount() {
        return productService.getAllProductsWithVentaCount();
    }


}
