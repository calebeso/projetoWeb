import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatListModule, MatCardModule, MatMenuModule, MatInputModule, MatButtonToggleModule, MatIconModule,
  MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatToolbarModule,
  MatTabsModule, MatSidenavModule, MatTooltipModule, MatRippleModule, MatRadioModule, MatGridListModule,
  MatDatepickerModule, MatNativeDateModule, MatSliderModule } from '@angular/material';
  import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
  CovalentStepsModule, CovalentLoadingModule, CovalentSearchModule, CovalentPagingModule,
  CovalentNotificationsModule, CovalentMenuModule, CovalentDataTableModule, CovalentMessageModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material';
import { FlexLayoutModule} from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MenuComponent } from './view/menu/menu.component';
import { EventoFormComponent } from './view/evento/evento-form/evento-form.component';
import { EventoService } from './service/evento.service';
import { MessagesService } from "./service/messages.service";
import { FuncionarioFormComponent } from './view/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './view/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioSearchComponent } from './view/funcionario/funcionario-search/funcionario-search.component';
import { FuncionarioDetailComponent } from './view/funcionario/funcionario-detail/funcionario-detail.component';
import { TransporteFormComponent } from './view/transporte/transporte-form/transporte-form.component';
import { TransporteListComponent } from './view/transporte/transporte-list/transporte-list.component';
import { TransporteSearchComponent } from './view/transporte/transporte-search/transporte-search.component';
import { TransporteDetailComponent } from './view/transporte/transporte-detail/transporte-detail.component';
import { UsuarioFormComponent } from './view/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './view/usuario/usuario-list/usuario-list.component';
import { UsuarioSearchComponent } from './view/usuario/usuario-search/usuario-search.component';
import { UsuarioDetailComponent } from './view/usuario/usuario-detail/usuario-detail.component';
import { LoginComponent } from './view/login/login/login.component';
import { FuncionarioService } from './service/funcionario.service';
import { TransporteService } from './service/transporte.service';
import { EventoListComponent } from './view/evento/evento-list/evento-list.component';
import { EventoSearchComponent } from './view/evento/evento-search/evento-search.component';
import { EventoDetailComponent } from './view/evento/evento-detail/evento-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EventoFormComponent,
    FuncionarioFormComponent,
    FuncionarioListComponent,
    FuncionarioSearchComponent,
    FuncionarioDetailComponent,
    TransporteFormComponent,
    TransporteListComponent,
    TransporteSearchComponent,
    TransporteDetailComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    UsuarioSearchComponent,
    UsuarioDetailComponent,
    LoginComponent,
    EventoListComponent,
    EventoSearchComponent,
    EventoDetailComponent,
  
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,



    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule

  ],
  providers: [
    FuncionarioService,
    TransporteService,
    EventoService,
    MessagesService
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
