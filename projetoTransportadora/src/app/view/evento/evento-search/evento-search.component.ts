import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Evento } from 'src/app/model/evento';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/service/evento.service';
import { TipoAcaoValues } from 'src/app/model/tipo-acao';
import { MessagesService } from 'src/app/service/messages.service';
import { TdDialogService } from '@covalent/core/dialogs';
import { Status } from 'src/app/model/situacao-evento';

@Component({
  selector: 'app-evento-search',
  templateUrl: './evento-search.component.html',
  styleUrls: ['./evento-search.component.css']
})
export class EventoSearchComponent implements OnInit {

  situacaoEvento : Array<Status>; 

  private eventos : Evento; 

  evento: Array<Evento>; 

  constructor(private router: Router,
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessagesService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.listar();
  }

  navigateToNovo() {
    this.router.navigate(['cadastrar'], { relativeTo: this.activatedRoute });

  }

  navigateTo(evento) {
    console.log(evento.acaoRealizada);
    let id: number  = evento.eventoSelecionadoId;
    if(evento.acaoRealizada == TipoAcaoValues[0]){
      this.router.navigate(['detalhes/'+id], { relativeTo: this.activatedRoute });
    }
    else if(evento.acaoRealizada == TipoAcaoValues[1]){
      this.router.navigate(['alterar/'+id], { relativeTo: this.activatedRoute });
    
    } else if(evento.acaoRealizada == TipoAcaoValues[2]){
      this.remover(id);
    } else if(evento.acaoRealizada == TipoAcaoValues[3]){
      this.iniciar(id);
    } else if(evento.acaoRealizada == TipoAcaoValues[4]){
      this.finalizar(id);
    } else if(evento.acaoRealizada == TipoAcaoValues[5]){
      this.cancelar(id);
    }
    
  }

  listar(){
    this.eventoService.listar().subscribe(dados => {
      this.evento = dados;
      console.log(this.evento);
    },
    (error: any) => {
      this.messageService.toastError(error.error.message);
    });
  }

  cancelar(id: number){
    this.openCancelarConfirm(id);
  }

 openCancelarConfirm(id: number): void {
    this._dialogService.openPrompt({
      message: 'Por que deseja cancelar este evento?',
      disableClose: false, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Cancelar Evento', //OPTIONAL, hides if not provided
      value: 'Motivo cancelamento', //OPTIONAL
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Ok', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (this.eventoService.iniciar(id)) {
        this.messageService.toastError('Evento não foi iniciado.');
      }
      if (accept) {
        this.eventoService.cancelar(id).subscribe(dados => {
          this.messageService.toastSuccess('Evento cancelado com sucesso.');
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


  finalizar(id: number){
    this.openFinalizarConfirm(id);
  }

  openFinalizarConfirm(id: number): void {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja finalizar esse evento?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Finalizar evento', //OPTIONAL, hides if not provided
      cancelButton: 'Não', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Sim', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
        if(this.eventoService.iniciar(id)){
          this.messageService.toastError('Evento não foi iniciado.');
        }
        if (accept) {
          this.eventoService.finalizar(id).subscribe(dados => {
          this.messageService.toastSuccess('Evento finalizado com sucesso.');
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

  iniciar(id: number){
    this.openIniciarConfirm(id);
  }

  openIniciarConfirm(id: number): void {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja iniciar esse evento?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Iniciar evento', //OPTIONAL, hides if not provided
      cancelButton: 'Não', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Sim', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.eventoService.iniciar(id).subscribe(dados => {
          this.messageService.toastSuccess('Evento iniciado com sucesso.');
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

  remover(id: number){
    this.openRemoverConfirm(id);
  }

  openRemoverConfirm(id: number): void {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja excluir esse evento?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Excluir evento', //OPTIONAL, hides if not provided
      cancelButton: 'Não', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Sim', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.eventoService.remover(id).subscribe(dados => {
          this.messageService.toastSuccess('Evento excluído com sucesso.');
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
