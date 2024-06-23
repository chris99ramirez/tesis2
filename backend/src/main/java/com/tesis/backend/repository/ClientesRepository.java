package com.tesis.backend.repository;
import com.tesis.backend.model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientesRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByDNI(int DNI);
}
