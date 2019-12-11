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

import com.projetobase.model.entity.Evento;
import com.projetobase.model.service.EventoService;

@Component
@RestController
@RequestMapping( "/api/evento" )
public class EventoResource {

	@Autowired
	private EventoService eventoService;
	
	@PostMapping( "/insert" )
	public Evento cadastrar ( @RequestBody Evento evento ) {
		return this.eventoService.cadastrarEvento(evento);
	}
	
	@PostMapping( "/update" )
	public Evento atualizar ( @RequestBody Evento evento ) {
		return this.eventoService.atualizarEvento(evento);
	}
	
	@GetMapping( "/remove" )
	public void remover(@RequestParam("id") Long id) {
		this.eventoService.removerEvento(id);
	}
	
	@GetMapping("/list")
	public List<Evento> listar() {
		return this.eventoService.listarEventos();
	}
	
	
}
