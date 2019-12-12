import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario'

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  public usuario : Usuario; 

  constructor() { }

  Authentication( username, password){
    if(username === this.usuario.login && password === this.usuario.senha){
      sessionStorage.setItem('username', 'password')
      return true; 
    } else{
      return false; 
    }

  }

  

  
}
