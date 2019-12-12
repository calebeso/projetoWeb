package com.projetobase.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projetobase.model.entity.Funcionario;
import com.projetobase.model.entity.Usuario;
import com.projetobase.model.repository.UsuarioRepository;

@Service
@Transactional
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository; 
	
	
	/* Cadastra usuario*/
	public Usuario cadastrarUsuario(Usuario usuario) {
		return this.usuarioRepository.save(usuario);
	}
	
	/* Remove usuario */
	public void removerUsuario(long id) {
		this.usuarioRepository.deleteById(id);
	}
	
	/*Atualiza usuario*/
	public Usuario atualizarUsuario(Usuario usuario) {
		return this.usuarioRepository.save(usuario);
	}
	
	
}
