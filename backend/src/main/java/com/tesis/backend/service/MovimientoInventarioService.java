package com.tesis.backend.service;

import com.tesis.backend.model.MovimientoInventario;
import com.tesis.backend.repository.MovimientoInventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tesis.backend.dto.MovimientoInventarioDTO;

import java.util.List;
@Service
public class MovimientoInventarioService {

    @Autowired
    private MovimientoInventarioRepository movimientoInventarioRepository;

    public List<MovimientoInventarioDTO> getMovimientosByProductoId(Integer idProducto) {
        return movimientoInventarioRepository.findMovimientosByProductoId(idProducto);
    }

}