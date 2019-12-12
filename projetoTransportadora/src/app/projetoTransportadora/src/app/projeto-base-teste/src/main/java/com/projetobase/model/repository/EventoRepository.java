package com.projetobase.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.projetobase.model.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

	public Page<Evento> findByFuncionarioId(Long id, Pageable pageable);

	public Page<Evento> findByTransporteId(Long id, Pageable pageable);
}
