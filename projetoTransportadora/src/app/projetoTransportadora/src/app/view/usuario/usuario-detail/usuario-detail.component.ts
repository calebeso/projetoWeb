import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  public usuario: Usuario;



  constructor(
    private usuarioServie: UsuarioService,
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.usuario = new Usuario(null, null, null);
    this.usuario.id = this.activatedRoute.snapshot.params['id'];
    if(this.usuario.id){
      this.loadDados();
    }
  }

  loadDados(){
    this.usuarioServie.detalhar(this.usuario.id).subscribe(res => {
      this.usuario = new Usuario(res.id, res.login, res.senha);
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
    this.router.navigate(['../../alterar/'+this.usuario.id], { relativeTo: this.activatedRoute });
  }

}
