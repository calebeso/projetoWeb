import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transporte } from '../model/transporte';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Transporte[]>('http://localhost:4200/api/api/transporte/list/');
  }

  cadastrar(transporte: Transporte){
    return this.http.post<Transporte>('http://localhost:4200/api/api/transporte/insert/', transporte);
  }

  editar(transporte: Transporte){
    return this.http.post<Transporte>('http://localhost:4200/api/api/transporte/update/', transporte);
  }

  remover(transporteId: number){
    return this.http.get('http://localhost:4200/api/api/transporte/remove?id='+transporteId);

  }

  detalhar(transporteId: number){
    return this.http.get<Transporte>('http://localhost:4200/api/api/transporte/find?id='+transporteId);
  }
}
