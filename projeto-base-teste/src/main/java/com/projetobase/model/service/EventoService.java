package com.projetobase.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.projetobase.model.entity.Evento;
import com.projetobase.model.entity.SituacaoEvento;
import com.projetobase.model.repository.EventoRepository;

@Service
@Transactional
public class EventoService {

	@Autowired
	private EventoRepository eventoRepository; 
	
	/*Cadastra evento*/
	public Evento cadastrarEvento(Evento evento) {
		evento.setStatus(SituacaoEvento.CRIADO);
		return this.eventoRepository.save(evento);
	}
	
	/*Inicia evento*/
	public Evento iniciarEvento(long id) {
		Evento evento = this.eventoRepository.findById(id).orElse(null);
		evento.setStatus(SituacaoEvento.INICIADO);
		return this.eventoRepository.save(evento);
	}
	
	/*Finalizar evento*/
	public Evento finalizarEvento(long id) {
		Evento evento = this.eventoRepository.findById(id).orElse(null);
		if(evento.getStatus() == SituacaoEvento.INICIADO) {
			evento.setStatus(SituacaoEvento.FINALIZADO);
		}return this.eventoRepository.save(evento);
	}
	
	/*Cancela evento*/
	public Evento cancelarEvento(long id) {
		Evento evento = this.eventoRepository.findById(id).orElse(null);
		if(evento.getStatus() == SituacaoEvento.INICIADO) {
			evento.setStatus(SituacaoEvento.CANCELADO);
		}return this.eventoRepository.save(evento);
	}
	
	
	/*Lista eventos*/
	public List<Evento> listarEventos(){
		return this.eventoRepository.findAll();
	}
	
	/*Remove evento*/
	public void removerEvento(long id) {
		this.eventoRepository.deleteById(id);
	}
	
	/*Atualiza evento*/
	public Evento atualizarEvento(Evento evento) {
		return this.eventoRepository.save(evento);
	}
	
	/*Listar por funcionario*/
	public Page<Evento> listarEventoPorFuncionario(long funcionarioId, PageRequest pageable){
		return this.eventoRepository.findByFuncionarioId(funcionarioId, pageable);
	}
	
	/*Listar por transporte*/
	public Page<Evento> listarEventoPorTransporte(long transporteId, PageRequest pageable){
		return this.eventoRepository.findByTransporteId(transporteId, pageable);
	}
	
	/*Detlha evento*/
	public Evento detalharEvento(long id) {
		
		Evento  evento = this.eventoRepository.findById(id).orElse(null);
		evento.setStatus(SituacaoEvento.CRIADO);
		
		Assert.notNull(evento, "O Id "+ id +" não foi encontrado.");
		
		return evento;
	}
	
}
