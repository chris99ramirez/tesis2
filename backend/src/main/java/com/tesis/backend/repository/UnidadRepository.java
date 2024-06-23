package com.tesis.backend.repository;
import com.tesis.backend.model.Unidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UnidadRepository extends JpaRepository<Unidad, Integer> {

}
