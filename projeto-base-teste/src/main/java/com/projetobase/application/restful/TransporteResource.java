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

import com.projetobase.model.entity.Transporte;
import com.projetobase.model.service.TransporteService;

@Component
@RestController
@RequestMapping( "/api/transporte" )
public class TransporteResource {

	@Autowired
	private TransporteService transporteService; 
	
	@PostMapping( "/insert" )
	public Transporte cadastrar ( @RequestBody Transporte transporte ) {
		return this.transporteService.cadastrarTransporte(transporte);
	}
	
	@PostMapping( "/update" )
	public Transporte atualizar ( @RequestBody Transporte transporte ) {
		return this.transporteService.atualizarTransporte(transporte);
	}
	
	@GetMapping( "/remove" )
	public void remover(@RequestParam("id") Long id) {
		this.transporteService.removerTransporte(id);
	}
	
	@GetMapping("/list")
	public List<Transporte> listar() {
		return this.transporteService.listarTransportes();
	}
	
	@GetMapping("/find")
	public Transporte detalhar(@RequestParam("id") Long id) {
		return this.transporteService.detalharTransporte(id);
	}
}
