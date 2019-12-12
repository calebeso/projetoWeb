package com.projetobase.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;


import com.projetobase.model.entity.Transporte;
import com.projetobase.model.repository.TransporteRepository;

@Service
@Transactional
public class TransporteService {
	
	@Autowired 
	TransporteRepository transporteRepository;
	
	/* Cadastra veiculos */
	public Transporte cadastrarTransporte(Transporte transporte) {
		return this.transporteRepository.save(transporte);
	}
	
	/* Lista transportes cadastrados */
	public List<Transporte> listarTransportes(){
		return this.transporteRepository.findAll();
	}
	
	/* Remove transporte cadastrado */
	public void removerTransporte(long id) {
		this.transporteRepository.deleteById(id);
	}
	
	/* Atualiza transporte cadastrado */
	public Transporte atualizarTransporte(Transporte transporte) {
		return this.transporteRepository.save(transporte);
	}
	
	
    public Transporte detalharTransporte(long id) {
		
		Transporte transporte = this.transporteRepository.findById(id).orElse(null);
		
		Assert.notNull(transporte, "O Id "+ id +" não foi encontrado.");
		
		return transporte;
	}
	
	

}
