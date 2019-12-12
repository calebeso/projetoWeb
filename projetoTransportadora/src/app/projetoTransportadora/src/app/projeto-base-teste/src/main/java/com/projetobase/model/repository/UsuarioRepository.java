package com.projetobase.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetobase.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long > {

	
}
