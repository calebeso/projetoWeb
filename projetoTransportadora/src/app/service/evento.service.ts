import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento }     from '../model/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Evento[]>('http://localhost:4200/api/api/evento/list/');
  }

  detalhar(eventoId: number){
    return this.http.get<Evento>('http://localhost:4200/api/api/evento/find?id='+eventoId);
  }

  cadastrar(evento: Evento){
    return this.http.post<Evento>('http://localhost:4200/api/api/evento/insert/', evento);
  }

  editar(evento: Evento){
    return this.http.post<Evento>('http://localhost:4200/api/api/evento/update/', evento);
  }

  remover(eventoId: number){
    return this.http.get('http://localhost:4200/api/api/evento/remove?id='+eventoId);

  }

  iniciar(eventoId: number){
    return this.http.get('http://localhost:4200/api/api/evento/start?id='+eventoId);
  }

  finalizar(eventoId: number){
    return this.http.get('http://localhost:4200/api/api/evento/stop?id='+eventoId);
  }

  cancelar(eventoId: number){
    return this.http.get('http://localhost:4200/api/api/evento/cancel?id='+eventoId);
  }
}

