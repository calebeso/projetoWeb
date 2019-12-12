import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { Transporte } from 'src/app/model/transporte';
import { Router, ActivatedRoute } from '@angular/router';
import { TransporteService } from 'src/app/service/transporte.service';
import { TipoAcaoValues } from 'src/app/model/tipo-acao';
import { MessagesService } from 'src/app/service/messages.service';
import { TdDialogService } from '@covalent/core/dialogs';

@Component({
  selector: 'app-transporte-search',
  templateUrl: './transporte-search.component.html',
  styleUrls: ['./transporte-search.component.css']
})
export class TransporteSearchComponent implements OnInit {

  transporte : Array<Transporte>;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private transporteService: TransporteService,
    private messageService: MessagesService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
    ) { }

  ngOnInit() {
    this.listar();
  }


  navigateToNovo() {
    this.router.navigate(['cadastrar'], { relativeTo: this.activatedRoute });

  }

  
  navigateTo(evento) {
    console.log(evento.acaoRealizada);
    let id: number  = evento.transporteSelecionadoId;
    if(evento.acaoRealizada == TipoAcaoValues[0]){
      this.router.navigate(['detalhes/'+id], { relativeTo: this.activatedRoute });
    }
    else if(evento.acaoRealizada == TipoAcaoValues[1]){
      this.router.navigate(['alterar/'+id], { relativeTo: this.activatedRoute });
    
    } else if(evento.acaoRealizada == TipoAcaoValues[2]){
      this.remover(id);
    }
    
  }

  /**
   * Método para listar os funcionarios
   */
  listar(){
    this.transporteService.listar().subscribe(dados => {
      this.transporte = dados;
    },
    (error: any) => {
      this.messageService.toastError(error.error.message);
    });
  }
    
  /**
   * Método para remover um funcionario
   */
  remover(id: number){
    this.openRemoverConfirm(id);
  }

  openRemoverConfirm(id: number): void {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja excluir esse funcionário?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Excluir funcionário', //OPTIONAL, hides if not provided
      cancelButton: 'Não', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Sim', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.transporteService.remover(id).subscribe(dados => {
          this.messageService.toastSuccess('Funcionário excluído com sucesso.');
          this.listar();
        },
        (error: any) => {
          console.log(error.error.message);
          this.messageService.toastError(error.error.message);
          
        });
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

}
