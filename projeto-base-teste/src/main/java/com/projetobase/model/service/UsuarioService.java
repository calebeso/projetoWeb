package com.projetobase.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

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
	
	/*Detalha usuario*/
	public Usuario detalharUsuario(long id) {
		
		Usuario  usuario = this.usuarioRepository.findById(id).orElse(null);
		
		Assert.notNull(usuario, "O Id "+ id +" não foi encontrado.");
		
		return usuario;
	}
	
	/* Lista usuarios cadastrados */
	public List<Usuario> listarUsuarios(){
		return this.usuarioRepository.findAll();
	}
	
	
}
