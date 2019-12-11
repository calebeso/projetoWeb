import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Evento } from 'src/app/model/evento';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/service/evento.service';
import { TipoAcaoValues } from 'src/app/model/tipo-acao';
import { MessagesService } from 'src/app/service/messages.service';
import { TdDialogService } from '@covalent/core/dialogs';

@Component({
  selector: 'app-evento-search',
  templateUrl: './evento-search.component.html',
  styleUrls: ['./evento-search.component.css']
})
export class EventoSearchComponent implements OnInit {

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
