import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthUserService } from 'src/app/service/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup; 

  public usuario : Usuario; 

  constructor(private fb: FormBuilder,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private loginService: AuthUserService
  ) { }

   id: number; 
   username: string; 
   password: string;
   invalidLogin = false;  

  ngOnInit() {
    this.usuario = new Usuario(null, null, null);
    this.usuario.id = this.activatedRoute.snapshot.params['id'];
    //this.createForm();
    console.log(this.usuario)
    console.log(this.usuario.id)
  }

  login(){
    if(this.loginService.Authentication(this.usuario.id, this.usuario.login, this.usuario.senha)
    ){
      this.router.navigate(['usuario/cadastrar'])
      this.invalidLogin = false
    }else
      this.invalidLogin = true
}

}
