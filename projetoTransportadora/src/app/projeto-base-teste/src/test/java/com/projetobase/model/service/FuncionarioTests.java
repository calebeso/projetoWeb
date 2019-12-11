package com.projetobase.model.service;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import javax.validation.ConstraintViolationException;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.test.context.jdbc.Sql;

import com.projetobase.model.entity.Funcionario;
import com.projetobase.model.repository.FuncionarioRepository;

public class FuncionarioTests  extends AbstractIntegrationTests{

	
	@Autowired
	private FuncionarioService funcionarioService; 
	
	@Autowired
	private FuncionarioRepository funcionarioRepository; 
	
	
	
	
	/* -------------------TESTE DE CADASTRO--------------------- */
	
	@Test
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/funcionario.sql"
	})
	public void cadastrarFuncionarioMustPass() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("João");
		funcionario.setCnh("00000000454");
		funcionario.setCpf("00000005454");
		funcionario.setDataNascimento(LocalDate.of(2000, 01, 01));
		
		funcionarioService.cadastrarFuncionario(funcionario);
		
		Assert.assertNotNull(funcionario.getId());
	}
	
	@Test
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/funcionario.sql"
	})
	public void cadastrarFuncionarioMustPassVerificandoIdade() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("Bernardo");
		funcionario.setCnh("01010101011");
		funcionario.setCpf("10010010002");
		funcionario.setDataNascimento(LocalDate.of(1980, 01, 20));
		
		funcionarioService.cadastrarFuncionario(funcionario);
		
		Assert.assertNotNull(funcionario.getId());
		Assert.assertTrue(funcionario.getIdade().equals(39));
		
	}
	
	@Test(expected = DataIntegrityViolationException.class)
	@Sql({ "/dataset/truncate.sql", 
		"/dataset/funcionario.sql" })
	public void cadastrarFuncionarioMustFailCpfDuplicado() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("Benicio");
		funcionario.setCnh("11212121212");
		funcionario.setCpf("10900228911");
		funcionario.setDataNascimento(LocalDate.of(1999, 07, 12));
		
		funcionarioService.cadastrarFuncionario(funcionario);
		
	}
	
	@Test(expected = InvalidDataAccessApiUsageException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void cadastrarFuncionarioMustFailMenorIdade() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("Izabella");
		funcionario.setCnh("12312312312");
		funcionario.setCpf("00011122231");
		funcionario.setDataNascimento(LocalDate.of(2003, 04, 19));
		
		funcionarioService.cadastrarFuncionario(funcionario);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void cadastrarFuncionarioMustFailNomeEmBranco() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("");
		funcionario.setCnh("12312313211");
		funcionario.setCpf("00100100121");
		funcionario.setDataNascimento(LocalDate.of(1998, 02, 12));
		
		this.funcionarioService.cadastrarFuncionario(funcionario);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void cadastrarFuncionarioMustFailCpfEmBranco() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("Daizi");
		funcionario.setCnh("12312313211");
		funcionario.setCpf("");
		funcionario.setDataNascimento(LocalDate.of(1998, 02, 12));
		
		this.funcionarioService.cadastrarFuncionario(funcionario);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void cadastrarFuncionarioMustFailCnhEmBranco() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("Diego");
		funcionario.setCnh("");
		funcionario.setCpf("00100100121");
		funcionario.setDataNascimento(LocalDate.of(1998, 02, 12));
		
		this.funcionarioService.cadastrarFuncionario(funcionario);
	}
	
	/* -------------------TESTE DE LISTAGEM --------------------- */
	
	@Test
	@Sql({ "/dataset/truncate.sql", 
		"/dataset/funcionario.sql"})
	public void listarFuncionarioMustPass() {
		List<Funcionario> funcionarios = this.funcionarioService.listarFuncionarios();
		Assert.assertEquals(funcionarios.size(), 2);

	}
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void listarFuncionariosPorFiltrosMustPassSemFiltros() {
		List<Funcionario> funcionarios = this.funcionarioService.listarFuncionariosPorFiltros( null, null, null, null).getContent();
		Assert.assertEquals(funcionarios.size(), 2);
	}
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void listarFuncionariosPorFiltrosMustPassFiltrarPorNome() {
		List<Funcionario> funcionarios = this.funcionarioService.listarFuncionariosPorFiltros("mar", null, null, null).getContent();
		Assert.assertEquals(1, funcionarios.size());
	}
	
	
	
	
	/* ----------------- REMOVER FUNCIONARIOS ----------------------- */
	 
	 
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void removerFuncionarioMustPass() {
		
		this.funcionarioService.removerFuncionario(1001);
		
		Funcionario funcionario = 
				this.funcionarioRepository.findById(1001L).orElse(null);
		
		Assert.assertNull(funcionario);
	}
	
	/* --------------------- ATUALIZAR FUNCIONARIOS -------------------- */
	
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void atualizarFuncionarioMustPass() {
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		funcionario.setDataNascimento(LocalDate.of(1993, Month.JULY, 1));

		funcionarioService.atualizarFuncionario(funcionario);

		Assert.assertTrue(funcionario.getDataNascimento().getYear() == 1993);

	}
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void atualizarFuncionarioMustPassVerificandoIdade() {
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		funcionario.setDataNascimento(LocalDate.of(1998, Month.JANUARY, 1));

		funcionarioService.atualizarFuncionario(funcionario);

		Assert.assertTrue(funcionario.getIdade().equals(21));

	}
	
	@Test(expected = DataIntegrityViolationException.class)
	@Sql({ "/dataset/truncate.sql",  
		"/dataset/funcionario.sql" })
	public void atualizarFuncionarioMustFailCpfDuplicado() {
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);

		funcionario.setDataNascimento(LocalDate.of(1990, Month.JANUARY, 1));
		funcionario.setCpf("10950228911");
	

		funcionarioService.atualizarFuncionario(funcionario);

	}
	
	@Test(expected = InvalidDataAccessApiUsageException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void atualizarFuncionarioMustFailIdadeMenor() {
		Funcionario funcionario = this.funcionarioRepository.findById(1002L).orElse(null);

		funcionario.setDataNascimento(LocalDate.of(2010, Month.JANUARY, 1));

		funcionarioService.atualizarFuncionario(funcionario);

	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void atualizarFuncionarioMustFailNomeEmBranco() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("");
		funcionario.setCpf("64444444444");
		funcionario.setDataNascimento(LocalDate.of(2000, Month.JANUARY, 1));

		this.funcionarioService.cadastrarFuncionario(funcionario);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",  
		"/dataset/funcionario.sql" })
	public void atualizarFuncionarioMustFailCpfEmBranco() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("Jorge");
		funcionario.setCpf("");
		funcionario.setDataNascimento(LocalDate.of(2000, Month.JANUARY, 1));

		this.funcionarioService.cadastrarFuncionario(funcionario);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",  
		"/dataset/funcionario.sql" })
	public void atualizarFuncionarioMustFailCnhEmBranco() {
		Funcionario funcionario = new Funcionario();
		funcionario.setNome("Jorge");
		funcionario.setCpf("10900228911");
		funcionario.setCnh("");
		funcionario.setDataNascimento(LocalDate.of(2000, Month.JANUARY, 1));

		this.funcionarioService.cadastrarFuncionario(funcionario);
	}

	
	/* ------------ DETALHAR FUNCIONARIOS -------------------- */
	
	@Test()
	@Sql({ "/dataset/truncate.sql",  
		"/dataset/funcionario.sql" })
	public void detalharFuncionarioMustPass() {
		Funcionario funcionario = this.funcionarioService.detalharFuncionario(1001L);

		Assert.assertNotNull(funcionario);
		Assert.assertNotNull(funcionario.getId());
		Assert.assertEquals(funcionario.getCpf(), "10900228911");

	}
	
	@Test(expected = IllegalArgumentException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void detalharFuncionarioMustFailIdNaoExiste() {
		
		Funcionario funcionario = this.funcionarioService.detalharFuncionario(1L);
	
	}
	
	
	
	
	
}
