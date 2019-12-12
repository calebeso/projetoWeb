import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transporte } from 'src/app/model/transporte';
import { TipoAcaoValues } from 'src/app/model/tipo-acao';
 
@Component({
  selector: 'app-transporte-list',
  templateUrl: './transporte-list.component.html',
  styleUrls: ['./transporte-list.component.css']
})
export class TransporteListComponent implements OnInit {

  @Input() transporte : Transporte[];

  @Output() selecionarTransporte = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selecionar(id: any, acao: number) {
    this.selecionarTransporte.emit({transporteSelecionadoId : id, acaoRealizada : TipoAcaoValues[acao]})

  }

}
