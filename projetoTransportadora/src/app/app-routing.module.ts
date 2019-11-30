import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoFormComponent } from './view/evento/evento-form/evento-form.component';


const routes: Routes = [
  {
    component: EventoFormComponent,
    path: 'evento/cadastrar'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
