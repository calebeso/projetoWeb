import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Evento } from 'src/app/model/evento';
import { TipoAcaoValues } from 'src/app/model/tipo-acao';


@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  @Input() evento : Evento[];

  @Output() selecionarEvento = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  selecionar(id: any, acao: number) {
    this.selecionarEvento.emit({eventoSelecionadoId : id, acaoRealizada : TipoAcaoValues[acao]})

  }

}
