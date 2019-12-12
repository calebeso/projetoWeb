package com.projetobase.application.restful;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projetobase.model.entity.Usuario;
import com.projetobase.model.service.UsuarioService;

@Component
@RestController
@RequestMapping( "/api/usuario" )
public class UsuarioResource {
	
	@Autowired
	private UsuarioService usuarioService; 
	
	@GetMapping("/find")
	public Usuario detalhar(@RequestParam("id") Long id) {
		return this.usuarioService.detalharUsuario(id);
	}
	
	
	@GetMapping("/remove")
	public void remover(@RequestParam("id") Long id) {
		this.usuarioService.removerUsuario(id);
	}
	
	@PostMapping( "/insert" )
	public Usuario cadastrar( @RequestBody Usuario usuario )
	{
		return this.usuarioService.cadastrarUsuario(usuario);
	}
	

	@PostMapping( "/update" )
	public Usuario atualizar( @RequestBody Usuario usuario )
	{
		return this.usuarioService.atualizarUsuario(usuario);
	}
	
	@GetMapping("/list")
	public List<Usuario> listar() {
		return this.usuarioService.listarUsuarios();
	}

}
