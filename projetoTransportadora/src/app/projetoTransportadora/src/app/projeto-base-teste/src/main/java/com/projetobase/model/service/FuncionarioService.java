package com.projetobase.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.projetobase.model.entity.Funcionario;
import com.projetobase.model.repository.FuncionarioRepository;

@Service
@Transactional
public class FuncionarioService {
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	/* Cadastra funcionario */
		
	public Funcionario cadastrarFuncionario(Funcionario funcionario) {
		return this.funcionarioRepository.save(funcionario);
	}
	
	/* Lista funcionarios cadastrados */
	public List<Funcionario> listarFuncionarios(){
		return this.funcionarioRepository.findAll();
	}
	
	/* Remove funcionario cadastrado */
	public void removerFuncionario(long id) {
		this.funcionarioRepository.deleteById(id);
	}
	
	/*Lista funcionario com filtro*/
	public Page<Funcionario> listarFuncionariosPorFiltros(String nome, String cpf, String cnh, PageRequest pageable){
		return this.funcionarioRepository.findByFilters(nome, cpf, cnh, pageable);
	}
	
	/*Atualiza funcionario*/
	public Funcionario atualizarFuncionario(Funcionario funcionario) {
		return this.funcionarioRepository.save(funcionario);
	}
	
	/* Detalha funcionario */
	
	public Funcionario detalharFuncionario(long id) {
		
		Funcionario  funcionario = this.funcionarioRepository.findById(id).orElse(null);
		
		Assert.notNull(funcionario, "O Id "+ id +" não foi encontrado.");
		
		return funcionario;
	}
	
	
	
	
	
}
