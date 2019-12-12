package com.projetobase.model.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Evento extends AbstractEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotBlank
	private String nome;
	
	@Column(nullable = false)
	@NotBlank
	private String cidadeDestino;
	
	@NotBlank
	private String km;
	
	
	private LocalDate dataSaida;
	
		
	private LocalTime horaSaida;
	
	
	@Getter
	@Enumerated( EnumType.ORDINAL )
	private SituacaoEvento status;
	
	@JsonIgnoreProperties("evento")
	@ManyToOne(targetEntity = Funcionario.class,
			fetch = FetchType.LAZY,
			optional = false)
	private Funcionario funcionario; 
	
	@JsonIgnoreProperties("evento")
	@ManyToOne(targetEntity = Transporte.class, fetch = FetchType.LAZY,
	optional = false)
	private Transporte transporte; 
	
	
}
