package com.projetobase.model.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.projetobase.model.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

	
	@Override
	@EntityGraph(attributePaths = "funcionario")
	public Optional<Evento> findById(Long id);
	
	public Page<Evento> findByFuncionarioId(Long id, Pageable pageable);

	public Page<Evento> findByTransporteId(Long id, Pageable pageable);
}
