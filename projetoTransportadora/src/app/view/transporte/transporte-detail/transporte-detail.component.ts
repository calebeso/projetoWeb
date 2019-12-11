import { Component, OnInit } from '@angular/core';
import { TransporteService } from 'src/app/service/transporte.service';
import { Transporte } from 'src/app/model/transporte';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-transporte-detail',
  templateUrl: './transporte-detail.component.html',
  styleUrls: ['./transporte-detail.component.css']
})
export class TransporteDetailComponent implements OnInit {

  public transporte: Transporte; 

  constructor(
    private transporteService: TransporteService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private messageService: MessagesService,
  ) { }

  ngOnInit() {
    this.transporte = new Transporte(null, null, null, null, null);
    this.transporte.id = this.activatedRoute.snapshot.params['id'];
    if(this.transporte.id){
      this.loadDados();
    }
  }

  loadDados(){
    this.transporteService.detalhar(this.transporte.id).subscribe(res => {
      this.transporte = new Transporte(res.id, res.modelo, res.placa, res.consumoTransporte, res.eventos);
    },
    (error: any) => {
      this.messageService.toastError(error.error.message);
    }
    );
    
  }

  onBack() {

    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    
  }


  navigateToEdit() {
    this.router.navigate(['../../alterar/'+this.transporte.id], { relativeTo: this.activatedRoute });
  }

}
