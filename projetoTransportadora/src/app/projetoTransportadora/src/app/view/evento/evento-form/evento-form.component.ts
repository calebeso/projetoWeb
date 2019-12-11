import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Evento } from 'src/app/model/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/service/evento.service';
import { MessagesService } from 'src/app/service/messages.service';
import { ParserToDateService } from 'src/app/service/parser-to-date.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {


  public eventoForm: FormGroup;


  public evento: Evento;



  private isOnUpdate: boolean = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private eventoService: EventoService,
    private messageService : MessagesService,
    private parserToDate: ParserToDateService,
    private _adapter: DateAdapter<any>
    ) { }

  ngOnInit() {

    this.evento = new Evento(null, null, null, null, null, null, null, null);
    this.createForm();
    this.evento.id = this.activatedRoute.snapshot.params['id'];
    if(this.evento.id){
      this.loadToEdit();
    }
  }

  public createForm(){

    this.eventoForm = this.fb.group(
      {
      nome: [null, { validators: [Validators.required], updateOn: 'blur' }],
      km: [null, { validators: [Validators.required], updateOn: 'blur' }], 
      cidadeDestino: [null, { validators: [Validators.required], updateOn: 'blur' }],
      dataSaida: [null, { validators: [Validators.required], updateOn: 'blur' }],
      dataChegada: [null, { validators: [Validators.required], updateOn: 'blur' }],
      horaSaida: [null, { validators: [Validators.required], updateOn: 'blur' }],
      previsaoChegada: [null, { validators: [Validators.required], updateOn: 'blur' }],
    }
    );

    this._adapter.setLocale('pt');
  }

  onSave() {
    if (this.eventoForm.valid) {

      this.evento.nome = this.eventoForm.get("nome").value;
      this.evento.km = this.eventoForm.get("km").value;
      this.evento.cidadeDestino = this.eventoForm.get("cidadeDestino").value;
      this.evento.dataChegada = this.eventoForm.get("dataChegada").value;
      this.evento.dataSaida = this.eventoForm.get("dataSaida").value;
      this.evento.horaSaida = this.eventoForm.get("horaSaida").value;
      this.evento.previsaoChegada = this.eventoForm.get("previsaoChegada").value;
      console.log(this.evento);

      if(this.evento.id == null){
        this.eventoService.cadastrar(this.evento).subscribe(res => {
          this.evento = res;
          this.messageService.toastSuccess('Departamento cadastrado com sucesso.');
          this.onBack();
        },
          (error: any) => {
            this.messageService.toastError(error.error.message);
          });
      }else{
        this.eventoService.editar(this.evento).subscribe(res => {
          this.evento = res;
          this.isOnUpdate = true;
          this.messageService.toastSuccess('Evento atualizado com sucesso.');
          this.onBack();
        },
          (error: any) => {
            this.messageService.toastError(error.error.message);
          }
          );
      }

    } else {
      this.messageService.toastWarnning('Preencha todos os campos obrigatórios antes de salvar.');
      
    }
}

loadToEdit(){
  this.eventoService.detalhar(this.evento.id).subscribe(res => {
    this.eventoForm.get("nome").setValue(res.nome);
    this.eventoForm.get("km").setValue(res.km);
    this.eventoForm.get("cidadeDestino").setValue(res.km);
    this.eventoForm.get("dataChegada").setValue(res.dataChegada);
    this.eventoForm.get("dataSaida").setValue(res.dataSaida);
    this.eventoForm.get("horaSaida").setValue(res.horaSaida);
    this.eventoForm.get("previsaoChegada").setValue(res.previsaoChegada);
    this.isOnUpdate = true;
  },
  (error: any) => {
    this.messageService.toastError(error.error.message);
  }
  );
}
  

  onBack() {
    if(!this.isOnUpdate){
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }else{
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    }
    
  }
  
}
