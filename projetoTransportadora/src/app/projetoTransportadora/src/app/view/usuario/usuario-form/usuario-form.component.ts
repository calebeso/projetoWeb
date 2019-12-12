import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DateAdapter } from '@angular/material/core';
 
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public usuarioForm: FormGroup; 

  public usuario: Usuario; 

  private isOnUpdate: boolean = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private messageService: MessagesService,
    private _adapter: DateAdapter<any>) { }

  ngOnInit() {

    this.usuario = new Usuario(null, null, null);
    this.createForm();
    this.usuario.id = this.activatedRoute.snapshot.params['id'];
    if (this.usuario.id){
      this.loadToEdit();
    }
  }

  public createForm(){

    this.usuarioForm = this.fb.group({
      login: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
      senha: [null, { validators: [Validators.required, Validators.maxLength(8)], updateOn: 'blur' }],
    });

    this._adapter.setLocale('pt');

  }

  onSave(){
    if(this.usuarioForm.valid){
      this.usuario.login = this.usuarioForm.get("login").value;
      this.usuario.senha = this.usuarioForm.get("senha").value;
      console.log(this.usuario);
    
    if (this.usuario.id == null) {
      this.usuarioService.cadastrar(this.usuario).subscribe(res => {
        this.usuario = res;
        this.messageService.toastSuccess('Usuario cadastrado com sucesso.');
        this.onBack();
      },
        (error: any) => {
          this.messageService.toastError(error.error.message);
        });
      }else {
      this.usuarioService.editar(this.usuario).subscribe(res => {
        this.usuario = res;
        this.isOnUpdate = true;
        this.messageService.toastSuccess('Usuario atualizado com sucesso.');
        this.onBack();
      },
      (error: any) => {
        this.messageService.toastError(error.error.message);
      });
    }
   } else {
    this.messageService.toastWarnning('Preencha todos os campos obrigatórios antes de salvar.');

    }
  }

  loadToEdit() {
    this.usuarioService.detalhar(this.usuario.id).subscribe(res => {
      this.usuarioForm.get("login").setValue(res.login);
      this.usuarioForm.get("senha").setValue(res.senha);
      this.isOnUpdate = true;
    },
      (error: any) => {
        this.messageService.toastError(error.error.message);
      });
 
  }

  onBack() {
    if (!this.isOnUpdate) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    }
  
  }

}
