import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { TipoAcaoValues } from 'src/app/model/tipo-acao';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  @Input() usuario : Usuario[];

  @Output() selecionarUsuario = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selecionar(id: any, acao: number) {
    this.selecionarUsuario.emit({usuarioSelecionadoId : id, acaoRealizada : TipoAcaoValues[acao]})

  }



}
