import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario){
    return this.http.post<Usuario>('http://localhost:4200/api/api/usuario/insert/', usuario);
  }

  editar(usuario: Usuario){
    return this.http.post<Usuario>('http://localhost:4200/api/api/usuario/update/', usuario);
  }

  remover(usuarioId: number){
    return this.http.get('http://localhost:4200/api/api/usuario/remove?id='+usuarioId);

  }

  detalhar(usuarioId: number){
    return this.http.get<Usuario>('http://localhost:4200/api/api/usuario/find?id='+usuarioId);
  }
  
  listar(){
    return this.http.get<Usuario[]>('http://localhost:4200/api/api/usuario/list/');
  }
}
