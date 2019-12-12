import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoFormComponent } from './view/evento/evento-form/evento-form.component';
import { FuncionarioSearchComponent } from './view/funcionario/funcionario-search/funcionario-search.component';
import { FuncionarioFormComponent } from './view/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioDetailComponent } from './view/funcionario/funcionario-detail/funcionario-detail.component';
import { TransporteFormComponent } from './view/transporte/transporte-form/transporte-form.component'
import { TransporteSearchComponent } from './view/transporte/transporte-search/transporte-search.component';
import { TransporteDetailComponent} from './view/transporte/transporte-detail/transporte-detail.component';
import { UsuarioFormComponent } from './view/usuario/usuario-form/usuario-form.component';
import { UsuarioSearchComponent } from './view/usuario/usuario-search/usuario-search.component';
import { UsuarioDetailComponent } from './view/usuario/usuario-detail/usuario-detail.component';
import { LoginComponent } from './view/login/login/login.component';
import { EventoSearchComponent } from './view/evento/evento-search/evento-search.component';
import { EventoDetailComponent } from './view/evento/evento-detail/evento-detail.component';
const routes: Routes = [
  {
    component: LoginComponent,
    path: ''
  },
  {
    component: EventoFormComponent,
    path: 'eventos/cadastrar'
  },
  {
    component: EventoSearchComponent,
    path: 'eventos'
  },
  {
    component: EventoFormComponent,
    path: 'eventos/alterar/:id'
  },
  {
    component: EventoDetailComponent,
    path: 'eventos/detalhes/:id'
  },
  {
    component: FuncionarioSearchComponent,
    path: 'funcionarios'
  },
  {
    component: FuncionarioFormComponent,
    path: 'funcionarios/cadastrar'
  },
  {
    component: FuncionarioFormComponent,
    path: 'funcionarios/alterar/:id'
  },
  {
    component: FuncionarioDetailComponent,
    path: 'funcionarios/detalhes/:id'
  },
  {
    component: TransporteFormComponent,
    path: 'transporte/cadastrar'
  },
  {
    component: TransporteFormComponent,
    path: 'transporte/alterar/:id'
  },
  {
    component: TransporteSearchComponent,
    path: 'transporte'
  },
  {
    component: TransporteDetailComponent,
    path: 'transporte/detalhes/:id'
  },
  {
    component: UsuarioFormComponent,
    path: 'usuario/cadastrar'
  },
  {
    component: UsuarioSearchComponent, 
    path: 'usuario'
  },
  {
    component: UsuarioFormComponent,
    path: 'usuario/alterar/:id'
  },
  {
    component: UsuarioDetailComponent,
    path: 'usuario/detalhes/:id'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
