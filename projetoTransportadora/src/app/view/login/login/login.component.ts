import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  ) { }

   username: string; 
   password: string; 

  ngOnInit() {
    this.usuario = new Usuario(null, null, null);
    this.usuario.id = this.activatedRoute.snapshot.params['id'];
    //this.createForm();
    console.log(this.usuario)
    console.log(this.usuario.id)
  }

  login(){
    if(this.username == this.usuario.login && this.password == this.usuario.senha){
      this.router.navigate([""]);
    }else{
      alert("Credenciais inválidas!")
    }
  
  }

}
