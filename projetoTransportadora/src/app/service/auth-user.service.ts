import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario'

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  public usuario : Usuario; 

  constructor() { }

  Authentication( id, username, password){
    if(id != null && username === this.usuario.login && password === this.usuario.senha){
      sessionStorage.setItem('username', 'password')
      return true; 
    } else{
      return false; 
    }

  }

  

  
}
