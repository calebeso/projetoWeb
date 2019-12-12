package com.projetobase.model.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projetobase.model.entity.Transporte;

public interface TransporteRepository extends JpaRepository<Transporte, Long> {
	
	public Optional<Transporte> findById(Long id);
	
	@Query("FROM Transporte transporte "
			+ "WHERE ( transporte.modelo LIKE '%' || :modelo || '%' OR :modelo IS NULL) AND "
			+ "( transporte.placa LIKE '%' || :placa || '%' OR :placa IS NULL) AND "
			+ "(transporte.consumoTransporte LIKE '%' || :consumoTransporte || '%' OR :consumoTransporte IS NULL)")
	public Page<Transporte> findByFilters(@Param("modelo") String modelo, @Param("placa") String placa, @Param("consumoTransporte") Number consumoTransporte, Pageable pageable );

}
