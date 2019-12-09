import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/model/funcionario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ParserToDateService } from 'src/app/service/parser-to-date.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  public funcionarioForm: FormGroup;


  public funcionario: Funcionario;

  private isOnUpdate: boolean = false; 
  
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService,
    private messageService: MessagesService,
    private parserToDate: ParserToDateService,
    private _adapter: DateAdapter<any>) { }

  ngOnInit() {

    this.funcionario = new Funcionario(null, null, null, null, null);
    this.createForm();
    this.funcionario.id = this.activatedRoute.snapshot.params['id'];
    if (this.funcionario.id) {
      this.loadToEdit();
  }

}


public createForm(){

  this.funcionarioForm = this.fb.group({
    nome: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
    cpf: [null, { validators: [Validators.required, Validators.maxLength(11)], updateOn: 'blur' }],
    cnh: [null, { validators: [Validators.required, Validators.maxLength(11)], updateOn: 'blur' }],
    dataNascimento: [null, { validators: [Validators.required], updateOn: 'blur' }],
  });

  this._adapter.setLocale('pt');
}

onSave(){
  if(this.funcionarioForm.valid){
    this.funcionario.nome = this.funcionarioForm.get("nome").value;
    this.funcionario.cpf = this.funcionarioForm.get("cpf").value;
    this.funcionario.cnh = this.funcionarioForm.get("cnh").value;
    this.funcionario.dataNascimento = this.funcionarioForm.get("dataNascimento").value;
    console.log(this.funcionario);


    if (this.funcionario.id == null) {
      this.funcionarioService.cadastrar(this.funcionario).subscribe(res => {
        this.funcionario = res;
        this.messageService.toastSuccess('Funcionário cadastrado com sucesso.');
        this.onBack();
      },
        (error: any) => {
          this.messageService.toastError(error.error.message);
        });
      }else {
      this.funcionarioService.editar(this.funcionario).subscribe(res => {
        this.funcionario = res;
        this.isOnUpdate = true;
        this.messageService.toastSuccess('Funcionário atualizado com sucesso.');
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
   this.funcionarioService.detalhar(this.funcionario.id).subscribe(res => {
     this.funcionarioForm.get("nome").setValue(res.nome);
     this.funcionarioForm.get("cpf").setValue(res.cpf);
     this.funcionarioForm.get("cnh").setValue(res.cnh);
     this.funcionarioForm.get("dataNascimento").setValue(res.dataNascimento);
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
