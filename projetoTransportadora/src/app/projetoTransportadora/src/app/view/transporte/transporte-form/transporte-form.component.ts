import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { Transporte } from 'src/app/model/transporte';
import { TransporteService } from 'src/app/service/transporte.service';
import { DateAdapter } from '@angular/material/core';
 
@Component({
  selector: 'app-transporte-form',
  templateUrl: './transporte-form.component.html',
  styleUrls: ['./transporte-form.component.css']
})
export class TransporteFormComponent implements OnInit {

  public transporteForm: FormGroup; 

  public transporte: Transporte; 

  private isOnUpdate: boolean = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transporteService: TransporteService,
    private messageService: MessagesService,
    private _adapter: DateAdapter<any>) { }

  ngOnInit() {

    this.transporte = new Transporte(null, null, null, null, null);
    this.createForm();
    this.transporte.id = this.activatedRoute.snapshot.params['id'];
    if (this.transporte.id){
      this.loadToEdit();
    }
  }

  public createForm(){

    this.transporteForm = this.fb.group({
      modelo: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
      placa: [null, { validators: [Validators.required, Validators.maxLength(8)], updateOn: 'blur' }],
      consumoTransporte: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
    });

    this._adapter.setLocale('pt');

  }


  onSave(){
    if(this.transporteForm.valid){
      this.transporte.modelo = this.transporteForm.get("modelo").value;
      this.transporte.placa = this.transporteForm.get("placa").value;
      this.transporte.consumoTransporte = this.transporteForm.get("consumoTransporte").value;
      console.log(this.transporte);
    
    if (this.transporte.id == null) {
      this.transporteService.cadastrar(this.transporte).subscribe(res => {
        this.transporte = res;
        this.messageService.toastSuccess('Transporte cadastrado com sucesso.');
        this.onBack();
      },
        (error: any) => {
          this.messageService.toastError(error.error.message);
        });
      }else {
      this.transporteService.editar(this.transporte).subscribe(res => {
        this.transporte = res;
        this.isOnUpdate = true;
        this.messageService.toastSuccess('Transporte atualizado com sucesso.');
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
    this.transporteService.detalhar(this.transporte.id).subscribe(res => {
      this.transporteForm.get("modelo").setValue(res.modelo);
      this.transporteForm.get("placa").setValue(res.placa);
      this.transporteForm.get("consumoTransporte").setValue(res.consumoTransporte);
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
