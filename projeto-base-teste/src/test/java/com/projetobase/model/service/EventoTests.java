package com.projetobase.model.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.List;

import javax.validation.ConstraintViolationException;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;

import com.projetobase.model.entity.Evento;
import com.projetobase.model.entity.Funcionario;
import com.projetobase.model.entity.SituacaoEvento;
import com.projetobase.model.entity.Transporte;
import com.projetobase.model.repository.EventoRepository;
import com.projetobase.model.repository.FuncionarioRepository;
import com.projetobase.model.repository.TransporteRepository;

public class EventoTests extends AbstractIntegrationTests{

	
	@Autowired
	private EventoService eventoService;
	
	@Autowired
	private EventoRepository eventoRepository; 
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	@Autowired
	private TransporteRepository transporteRepository;
	
/* -------------------TESTE DE CADASTRO--------------------- */
	
	@Test
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
	})
	public void cadastrarEventoMustPass() {
		Evento evento = new Evento();
		evento.setNome("TESTE");
		evento.setCidadeDestino("TESTE");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("600");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		eventoService.cadastrarEvento(evento);
		
		
		Assert.assertNotNull(evento.getId());
	}
	
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
	})
	public void cadastrarEventoMustFailNomeEmBranco() {
		Evento evento = new Evento();
		evento.setNome("");
		evento.setCidadeDestino("TESTE");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("600");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		this.eventoService.cadastrarEvento(evento);
		
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
	})
	public void cadastrarEventoMustFailDestinoEmBranco() {
		Evento evento = new Evento();
		evento.setNome("TESTE1");
		evento.setCidadeDestino("");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("600");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		this.eventoService.cadastrarEvento(evento);
		
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
	})
	public void cadastrarEventoMustFailKmEmBranco() {
		Evento evento = new Evento();
		evento.setNome("TESTE1");
		evento.setCidadeDestino("teste");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		this.eventoService.cadastrarEvento(evento);
		
	}
	
	/*------------------STATUS EVENTO----------------------------*/
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
		})
	public void iniciarEventoMustPass() {
		Evento evento = this.eventoService.iniciarEvento(1001);
		Assert.assertTrue(evento.getStatus().equals(SituacaoEvento.INICIADO));
	}
	
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
		})
	public void finalizarEventoMustPass() {
		Evento evento = this.eventoService.finalizarEvento(1001);
		Assert.assertTrue(evento.getStatus().equals(SituacaoEvento.FINALIZADO));
	}
	
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
		})
	public void cancelarEventoMustPass() {
		Evento evento = this.eventoService.cancelarEvento(1001);
		Assert.assertTrue(evento.getStatus().equals(SituacaoEvento.CANCELADO));
	}
	
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
		})
	public void finalizarEventoMustFailEventoNaoIniciado() {
		Evento evento = this.eventoService.finalizarEvento(1001);
		Assert.assertTrue(evento.getStatus().equals(SituacaoEvento.FINALIZADO));
	}
	
	
	@Test
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
	})
	public void cadastrarEventoMustPassVerificandoStatus() {
		Evento evento = new Evento();
		evento.setNome("TESTE");
		evento.setCidadeDestino("TESTE");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("600");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		eventoService.cadastrarEvento(evento);
		
		
		Assert.assertNotNull(evento.getId());
		Assert.assertTrue(evento.getStatus().equals(SituacaoEvento.CRIADO));
	}
	
	
	/*--------------------LISTAR EVENTOS------------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"
		})
	public void listarEventoMustPass() {
		List<Evento> eventos = this.eventoService.listarEventos();
		Assert.assertEquals(eventos.size(), 1);

	}
	
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"})
	public void listarEventoPorFuncionarioMustPass() {
		List<Evento> eventos = this.eventoService.listarEventoPorFuncionario(1001L, null).getContent();
		Assert.assertEquals(eventos.size(), 1);
	}
	
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"})
	public void listarEventoPorTransporteMustPass() {
		List<Evento> eventos = this.eventoService.listarEventoPorTransporte(1001L, null).getContent();
		Assert.assertEquals(eventos.size(), 1);
	}
	
	/* -------------------------ATUALIZAR EVENTO--------------------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"})
	public void atualizarEventoMustPass() {
		Evento evento = this.eventoRepository.findById(1001L).orElse(null);
		evento.setDataSaida(LocalDate.of(2020, Month.JANUARY, 1));

		eventoService.atualizarEvento(evento);

		Assert.assertTrue(evento.getDataSaida().getYear() == 2020);

	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql" })
	public void atualizarEventoMustFailNomeEmBranco() {
		Evento evento = new Evento();
		evento.setNome("");
		evento.setCidadeDestino("TESTE");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("600");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		this.eventoService.cadastrarEvento(evento);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql" })
	public void atualizarEventoMustFailDestinoEmBranco() {
		Evento evento = new Evento();
		evento.setNome("ATT");
		evento.setCidadeDestino("");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("600");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		this.eventoService.cadastrarEvento(evento);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({"/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql" })
	public void atualizarEventoMustFailKmEmBranco() {
		Evento evento = new Evento();
		evento.setNome("ATT");
		evento.setCidadeDestino("CIDADE");
		evento.setDataSaida(LocalDate.of(2019, Month.JANUARY, 01));
		evento.setKm("");
		evento.setHoraSaida(LocalTime.of(10, 00));
		Funcionario funcionario = this.funcionarioRepository.findById(1001L).orElse(null);
		evento.setFuncionario(funcionario);
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		evento.setTransporte(transporte);
		
		this.eventoService.cadastrarEvento(evento);
	}
	
	/*--------------------------REMOVE EVENTO------------------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql",
		"/dataset/funcionario.sql",
		"/dataset/transporte.sql",
		"/dataset/evento.sql"})
	public void removerEventoMustPass() {
		this.eventoService.removerEvento(1001);
		
		Evento evento = 
				this.eventoRepository.findById(1001L).orElse(null);
		
	Assert.assertNull(evento);
	}
}