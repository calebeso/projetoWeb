import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MessagesService } from 'src/app/service/messages.service';
import { TdDialogService } from '@covalent/core/dialogs';
import { TipoAcaoValues } from 'src/app/model/tipo-acao';

@Component({
  selector: 'app-usuario-search',
  templateUrl: './usuario-search.component.html',
  styleUrls: ['./usuario-search.component.css']
})
export class UsuarioSearchComponent implements OnInit {

  usuario : Array<Usuario>;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, 
    private usuarioService: UsuarioService,
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
    let id: number  = evento.usuarioSelecionadoId;
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
    this.usuarioService.listar().subscribe(dados => {
      this.usuario = dados;
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
      message: 'Tem certeza que deseja excluir esse usuário?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Excluir usuário', //OPTIONAL, hides if not provided
      cancelButton: 'Não', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Sim', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.usuarioService.remover(id).subscribe(dados => {
          this.messageService.toastSuccess('Usuário excluído com sucesso.');
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
