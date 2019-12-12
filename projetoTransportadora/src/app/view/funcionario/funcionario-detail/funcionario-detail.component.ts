import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/model/funcionario';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import * as moment from 'moment';



@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.css']
})
export class FuncionarioDetailComponent implements OnInit {

   //Instancia objeto evento//
  public funcionario: Funcionario;

  constructor(private funcionarioService: FuncionarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService) { }


    //Metódo de iniciação
  ngOnInit() {
    this.funcionario = new Funcionario(null, null, null, null, null, null);
    this.funcionario.id = this.activatedRoute.snapshot.params['id'];
    if (this.funcionario.id) {
      this.loadDados();
    }
    
  }

//Metódo que popula os campos com os dados corretos
  loadDados(){
    this.funcionarioService.detalhar(this.funcionario.id).subscribe(res => {
      this.funcionario = new Funcionario(res.id, res.nome, res.cpf, res.cnh, res.dataNascimento, res.eventos);
      
    },
    (error: any) => {
      this.messageService.toastError(error.error.message);
    }
    );
    
  }

//Volta a página
  onBack() {

    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    
  }

//Redireciona para página de alteração do evento
  navigateToEdit() {
    this.router.navigate(['../../alterar/'+this.funcionario.id], { relativeTo: this.activatedRoute });
  }

}
