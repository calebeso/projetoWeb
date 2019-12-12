package com.projetobase.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.projetobase.model.entity.Evento;
import com.projetobase.model.repository.EventoRepository;

@Controller
public class EventoController {

	@Autowired
	private EventoRepository er;	
	
	@RequestMapping(value="/cadastrarEvento", method=RequestMethod.GET) // URL DE REQUISIÇÃO PARA CONTROLLER 
	public String form() {
		return "eventos/FormEvento"; //HIERARQUIA DE PASTAS 
	}
	
	@RequestMapping(value="/cadastrarEvento", method=RequestMethod.POST)
	public String form(Evento evento) {
		
		er.save(evento); //FUNÇÃO RESPONSAVEL POR SALVAR OS DADOS NO BANCO
		return "redirect:/cadastrarEvento";
	}
	
	@RequestMapping("/eventos") //URL DE REQUISIÇÃO DA LISTA DE EVENTOS
	public ModelAndView listaEvento() {
		ModelAndView mv = new ModelAndView("eventos/index"); //CRIAÇÃO OBJETO MV 
		Iterable<Evento> eventos = er.findAll(); 
		mv.addObject("eventos", eventos); 
		return mv;
	}
}
