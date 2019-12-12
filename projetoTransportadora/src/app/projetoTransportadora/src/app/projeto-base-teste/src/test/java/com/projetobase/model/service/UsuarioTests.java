package com.projetobase.model.service;

import java.time.LocalDate;
import java.time.Month;

import javax.validation.ConstraintViolationException;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.jdbc.Sql;

import com.projetobase.model.entity.Funcionario;
import com.projetobase.model.entity.Usuario;
import com.projetobase.model.repository.UsuarioRepository;

public class UsuarioTests extends AbstractIntegrationTests {

	@Autowired UsuarioRepository usuarioRepository; 
	
	@Autowired UsuarioService usuarioService; 
	
	
	/* -----------------------------TESTE DE CADASTRO------------------------*/
	
	@Test
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/usuarios.sql"
	})
	public void cadastrarUsuarioMustPass() {
		Usuario usuario = new Usuario();
		usuario.setLogin("calebe");
		usuario.setSenha("123");
		
		usuarioService.cadastrarUsuario(usuario);
		
		Assert.assertNotNull(usuario.getId());
		
	}
	
	@Test(expected = DataIntegrityViolationException.class)
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/usuarios.sql"
	})
	public void cadastrarUsuarioMustFailLoginDuplicado() {
		Usuario usuario = new Usuario();
		usuario.setLogin("admin");
		usuario.setSenha("132");
		
		usuarioService.cadastrarUsuario(usuario);
	}
	
	@Test(expected = DataIntegrityViolationException.class)
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/usuarios.sql"
	})
	public void cadastrarUsuarioMustFailSenhaDuplicada() {
		Usuario usuario = new Usuario();
		usuario.setLogin("teste");
		usuario.setSenha("admin");
		
		usuarioService.cadastrarUsuario(usuario);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/usuarios.sql" })
	public void cadastrarUsuarioMustFailLoginEmBranco() {
		Usuario usuario = new Usuario();
		usuario.setLogin("");
		usuario.setSenha("abc");
		
		this.usuarioService.cadastrarUsuario(usuario);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/usuarios.sql" })
	public void cadastrarUsuarioMustFailSenhaEmBranco() {
		Usuario usuario = new Usuario();
		usuario.setLogin("Bella");
		usuario.setSenha("");
		
		this.usuarioService.cadastrarUsuario(usuario);
	}
	
	
	/* --------------------REMOVER USUARIO------------------------*/
	
	@Test
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/usuarios.sql"
	})
	public void removerUsuariosMustPass() {
		
		this.usuarioService.removerUsuario(1001);
		
		Usuario usuario = this.usuarioRepository.findById(1001L).orElse(null);
		
	    Assert.assertNull(usuario);
	
    }
	
	/* --------------------- ATUALIZAR USUARIO ------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/usuarios.sql" })
	public void atualizarUSuariosMustPass() {
		Usuario usuario = this.usuarioRepository.findById(1001L).orElse(null);
		usuario.setLogin("funcionario");

		usuarioService.atualizarUsuario(usuario);

		Assert.assertTrue(usuario.getLogin() == "funcionario");

	}
	
	@Test(expected = DataIntegrityViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/usuarios.sql" })
	public void atualizarUSuariosMustFailLoginDuplicado() {
		Usuario usuario = this.usuarioRepository.findById(1001L).orElse(null);
		usuario.setLogin("calebe");

		usuarioService.atualizarUsuario(usuario);

	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/usuarios.sql" })
	public void atualizarUSuariosMustFailLoginEmBranco() {
		Usuario usuario = new Usuario();
		usuario.setLogin("");
		usuario.setSenha("calebe");

		usuarioService.cadastrarUsuario(usuario);

	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/usuarios.sql" })
	public void atualizarUSuariosMustFailSenhaEmBranco() {
		Usuario usuario = new Usuario();
		usuario.setLogin("teste");
		usuario.setSenha("");

		usuarioService.cadastrarUsuario(usuario);

	}
	
	/* --------------------REMOVER USUARIO--------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/usuarios.sql" })
	public void removerUsuarioMustPass() {
		
		this.usuarioService.removerUsuario(1001);
		
		Usuario usuario = 
				this.usuarioRepository.findById(1001L).orElse(null);
		
		Assert.assertNull(usuario);
	}
	
	
	
	
	
	
	
}
