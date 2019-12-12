import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Evento } from 'src/app/model/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { DateAdapter } from '@angular/material/core';
import { EventoService } from 'src/app/service/evento.service';
import { Funcionario } from 'src/app/model/funcionario';
import { Transporte } from 'src/app/model/transporte';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { TransporteService } from 'src/app/service/transporte.service';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  //Evento form
  public eventoForm : FormGroup; 

  //Objeto evento
  private evento : Evento; 

  //Atualização
  private isOnUpdate: boolean = false;

  //Lista de funcionarios
  public funcionarioList: Array<Funcionario> = [];

  //Lista de transportes
  public transporteList: Array<Transporte> = [];

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService,
    private _adapter: DateAdapter<any>,
    private eventoService: EventoService,
    private funcionarioService: FuncionarioService,
    private transporteService: TransporteService) { }

  //Metodo de iniciação
  ngOnInit() {
    this.evento = new Evento(null, null, null, null, null, null, null, null, null);
    this.createForm();
    this.listarFuncionarios("");
    this.listarTransporte("");
    this.evento.id = this.activatedRoute.snapshot.params['id'];
    if (this.evento.id){
      this.loadToEdit();
    }
  }

  //Metodo pra criar form
  public createForm(){

    this.eventoForm = this.fb.group(
      {
      nome: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
      km: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
      cidadeDestino: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
      dataSaida: [null, { validators: [Validators.required], updateOn: 'blur' }],
      horaSaida: [null, { validators: [Validators.required], updateOn: 'blur' }],
      funcionario: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'select' }],
      transporte: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'select' }],

    }
    );

    this._adapter.setLocale('pt');

  }

  //Metodo para salvar evento
  onSave() {
    if (this.eventoForm.valid) {

      this.evento.nome = this.eventoForm.get("nome").value;
      var fun : Funcionario = this.eventoForm.get("funcionario").value;
      this.evento.funcionario = fun;
      var tran : Transporte = this.eventoForm.get("transporte").value;
      this.evento.transporte = tran; 
      this.evento.km = this.eventoForm.get("km").value;
      this.evento.cidadeDestino = this.eventoForm.get("cidadeDestino").value;
      this.evento.dataSaida = this.eventoForm.get("dataSaida").value;
      this.evento.horaSaida = this.eventoForm.get("horaSaida").value;
      console.log(this.evento);


      if(this.evento.id == null){
        this.eventoService.cadastrar(this.evento).subscribe(res => {
          this.evento = res;
          this.messageService.toastSuccess('Evento cadastrado com sucesso.');
          this.onBack();
        },
          (error: any) => {
            this.messageService.toastError(error.error.message);
          });
      }
      else {
        this.eventoService.editar(this.evento).subscribe(res => {
          this.evento = res;
          this.isOnUpdate = true;
          this.messageService.toastSuccess('Evento atualizado com sucesso.');
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

  //Metodo para popular os campos com os dados
  loadToEdit() {
    this.eventoService.detalhar(this.evento.id).subscribe(res => {
      this.eventoForm.get("nome").setValue(res.nome);
      this.eventoForm.get("km").setValue(res.km);
      this.eventoForm.get("cidadeDestino").setValue(res.cidadeDestino);
      this.eventoForm.get("dataSaida").setValue(res.dataSaida);
      this.eventoForm.get("horaSaida").setValue(res.horaSaida);
      this.eventoForm.get("funcionario").setValue(res.funcionario);
      this.eventoForm.get("transporte").setValue(res.transporte);
      this.isOnUpdate = true;
    },
      (error: any) => {
        this.messageService.toastError(error.error.message);
      });

  }

  //Metodo para voltar pagina
  onBack() {
    console.log(this.funcionarioList);
    if (!this.isOnUpdate) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    }

  } 

  //Display de funcionario

  displayFuncionario(funcionario?: Funcionario): string | undefined {
    return funcionario ? funcionario.nome : undefined;
  }

  listarFuncionarios(filter: string) {
    this.funcionarioService.listar().subscribe(dados => {
      this.funcionarioList = dados;
    },
      (error: any) => {
        this.messageService.toastError(error.error.message);
      });
  }

  selectFuncionario(event: any) {
    this.eventoForm.get("funcionario").setValue(event.option.value);
  }


  // Display de transporte //

  displayTransporte(transporte?: Transporte): string | undefined {
    return transporte ? transporte.modelo : undefined;
  }

  listarTransporte(filter: string) {
    this.transporteService.listar().subscribe(dados => {
      this.transporteList = dados;
    },
      (error: any) => {
        this.messageService.toastError(error.error.message);
      });
  }

  selectTransporte(event: any) {
    this.eventoForm.get("transporte").setValue(event.option.value);
  }
}