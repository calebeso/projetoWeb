package com.projetobase.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class Usuario extends AbstractEntity implements Serializable {
	

	private static final long serialVersionUID = 1L;
	
	@Column(nullable=false, unique=true)
	@NotBlank
	private String login;
	
	@Column(nullable=false, unique=true)
	@NotBlank
	private String senha; 
	
	
}
