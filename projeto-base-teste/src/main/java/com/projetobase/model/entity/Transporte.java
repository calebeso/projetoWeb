package com.projetobase.model.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class Transporte extends AbstractEntity implements Serializable{
	
private static final long serialVersionUID = 1L;
	
    
	@NotBlank
	private String modelo;
	
	@Column(unique = true, nullable = false, length = 8)
	@NotBlank
	private String placa;
	
	@Column(nullable = false)
    private Double consumoTransporte;
	
	@OneToMany(targetEntity = Evento.class, fetch = FetchType.EAGER,
			mappedBy="transporte")
	private List<Funcionario> funcionarios = new ArrayList<Funcionario>(); 
	
	public Transporte(Long id) {
		super.setId(id);
	}

}
