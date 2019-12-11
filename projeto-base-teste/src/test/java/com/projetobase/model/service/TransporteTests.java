package com.projetobase.model.service;

import java.util.List;

import javax.validation.ConstraintViolationException;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.jdbc.Sql;

import com.projetobase.model.entity.Transporte;
import com.projetobase.model.repository.TransporteRepository;

public class TransporteTests extends AbstractIntegrationTests{

	@Autowired
	private TransporteService transporteService; 
	
	@Autowired
	private TransporteRepository transporteRepository; 
	
	
	/* -------------------TESTE DE CADASTRO--------------------- */
	
	@Test
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/transporte.sql"
	})
	public void cadastrarTransporteMustPass() {
		Transporte transporte = new Transporte();
		transporte.setConsumoTransporte(60.0);
		transporte.setModelo("Ford");
		transporte.setPlaca("ASB-3020");
		
		transporteService.cadastrarTransporte(transporte);
		
		Assert.assertNotNull(transporte.getId());
	}
	
	@Test(expected = DataIntegrityViolationException.class)
	@Sql({
		"/dataset/truncate.sql",
		"/dataset/transporte.sql"
	})
	public void cadastrarTransporteMustFailPlacaDuplicada() {
		Transporte transporte = new Transporte();
		transporte.setConsumoTransporte(60.0);
		transporte.setModelo("Teste");
		transporte.setPlaca("ABC-1234");
		
		transporteService.cadastrarTransporte(transporte);
		
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/transporte.sql" })
	public void cadastrarTransporteMustFailModeloEmBranco() {
		Transporte transporte = new Transporte();
		transporte.setConsumoTransporte(40.0);
		transporte.setModelo("");
		transporte.setPlaca("XXX-1234");
		
		this.transporteService.cadastrarTransporte(transporte);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/transporte.sql" })
	public void cadastrarTransporteMustFailPlacaEmBranco() {
		Transporte transporte = new Transporte();
		transporte.setConsumoTransporte(40.0);
		transporte.setModelo("Teste");
		transporte.setPlaca("");
		
		this.transporteService.cadastrarTransporte(transporte);
	}
	
 /* ---------------------- TESTE LISTAGEM ------------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql", 
		"/dataset/transporte.sql"})
	public void listarTransporteMustPass() {
		List<Transporte> transportes = this.transporteService.listarTransportes();
		Assert.assertEquals(transportes.size(), 2);

	}
	
	/* -------------------------TESTE REMOVER------------------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/transporte.sql" })
	public void removerTransporteMustPass() {
		
		this.transporteService.removerTransporte(1001);
		
		Transporte transporte = 
				this.transporteRepository.findById(1001L).orElse(null);
		
		Assert.assertNull(transporte);
	}
	
	
	/* -------------------------TESTE ATUALIZAÇÃO ----------------------*/
	
	@Test
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/transporte.sql" })
	public void atualizarTransporteMustPass() {
		Transporte transporte = this.transporteRepository.findById(1001L).orElse(null);
		transporte.setModelo("ATT");

		transporteService.atualizarTransporte(transporte);

		Assert.assertTrue(transporte.getModelo() == "ATT");

	}
	
	@Test(expected = DataIntegrityViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/transporte.sql" })
	public void atualizarTransporteMustFailPlacaDuplicada() {
		Transporte transporte = this.transporteRepository.findById(1002L).orElse(null);
		transporte.setPlaca("ABC-1234");

		transporteService.atualizarTransporte(transporte);

	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void atualizarTransporteMustFailModeloEmBranco() {
			Transporte transporte = new Transporte();
			transporte.setConsumoTransporte(40.0);
			transporte.setModelo("");
			transporte.setPlaca("XXX-1234");

		this.transporteService.cadastrarTransporte(transporte);
	}
	
	@Test(expected = ConstraintViolationException.class)
	@Sql({ "/dataset/truncate.sql",   
		"/dataset/funcionario.sql" })
	public void atualizarTransporteMustFailPlacaEmBranco() {
			Transporte transporte = new Transporte();
			transporte.setConsumoTransporte(40.0);
			transporte.setModelo("ATT-TESTE");
			transporte.setPlaca("");

		this.transporteService.cadastrarTransporte(transporte);
	}
	
}
