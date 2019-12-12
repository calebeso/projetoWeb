package com.projetobase.model.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.util.Assert;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity 
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Funcionario extends AbstractEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	
	@NotBlank
	private String nome; 
	
	@Column(unique = true, nullable = false, length = 11)
	@NotBlank
	private String cpf; 
	
	@Column(unique = true, nullable = false, length = 11)
	@NotBlank
	private String cnh;
	
	@NotNull
	private LocalDate dataNascimento; 
	
	@JsonIgnoreProperties("funcionario")
	@OneToMany(targetEntity = Evento.class,
			fetch = FetchType.EAGER,
			mappedBy="funcionario")
	private List<Evento> evento = new ArrayList<Evento>();
	
	@Transient
	private Integer idade; 
	
	
	/* --------------------------------------------------- */

	public Funcionario(Long id) {
		super.setId(id);
	}
	
	
	public Integer getIdade() {
		if(dataNascimento != null) {
			return LocalDate.now().getYear() - dataNascimento.getYear();
		}else return this.idade;
		
	}
	
	@PrePersist
	@PreUpdate
	public void verificarIdade() {
		Assert.isTrue(this.getIdade() >= 18, "O funcionario deve ser maior de 18 anos");

	}
	





}
