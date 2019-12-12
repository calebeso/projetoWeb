import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/model/evento';
import { EventoService } from 'src/app/service/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import * as moment from 'moment';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {

  public evento: Evento;

  constructor(private eventoService: EventoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService) { }

  ngOnInit() {
    this.evento = new Evento(null, null, null, null, null, null, null, null, null);
    this.evento.id = this.activatedRoute.snapshot.params['id'];
    if (this.evento.id) {
      this.loadDados();
    }
  }

  loadDados(){
    this.eventoService.detalhar(this.evento.id).subscribe(res => {
      this.evento = new Evento(res.id, res.cidadeDestino,res.dataSaida, res.horaSaida, res.km, res.nome, res.status, res.transporte, res.funcionario);
    },
      (error: any) => {
      this.messageService.toastError(error.error.message);
    }
    );

}

onBack() {

  this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  
}

navigateToEdit() {
  this.router.navigate(['../../alterar/'+this.evento.id], { relativeTo: this.activatedRoute });
}

}

