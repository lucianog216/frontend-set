import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import{ FormsModule, ReactiveFormsModule} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import{UsuarioService} from './services/usuario.service';
import { UsuarioDescripcionComponent } from './components/usuario-descripcion/usuario-descripcion.component';
import { UsuarioGuardiaListComponent } from './components/usuario-guardia-list/usuario-guardia-list.component';
import { UsuarioSupervisorListComponent } from './components/usuario-supervisor-list/usuario-supervisor-list.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from './auth.guard'
import {TokenInterceptorService} from './services/token-interceptor.service';
import { GuardiaProfileListComponent } from './components/guardia-profile-list/guardia-profile-list.component';
import { SupervisorProfileListComponent } from './components/supervisor-profile-list/supervisor-profile-list.component';
import { SupervisorAgregarGuardiaComponent } from './components/supervisor-agregar-guardia/supervisor-agregar-guardia.component';
import { SupervisorListaGuardiasComponent } from './components/supervisor-lista-guardias/supervisor-lista-guardias.component';
import { SupervisorUsuarioDescripcionComponent } from './components/supervisor-usuario-descripcion/supervisor-usuario-descripcion.component';
import {GuardiaGuardiaDescripcionComponent} from './components/guardia-guardia-descripcion/guardia-guardia-descripcion.component';
import { InformacionPersonalUsuarioComponent } from './components/informacion-personal-usuario/informacion-personal-usuario.component';
import { ListaClienteAdmComponent } from './components/lista-cliente-adm/lista-cliente-adm.component';
import { AddClienteAdmComponent } from './components/add-cliente-adm/add-cliente-adm.component';
import { AddTurnosAdmComponent } from './components/add-turnos-adm/add-turnos-adm.component';
import { ListaTurnosAdmComponent } from './components/lista-turnos-adm/lista-turnos-adm.component';
import { ListaEquiposAdmComponent } from './components/lista-equipos-adm/lista-equipos-adm.component';
import { AddEquiposAdmComponent } from './components/add-equipos-adm/add-equipos-adm.component';
import { SupervisorInfoPersonalComponent } from './components/supervisor-info-personal/supervisor-info-personal.component';
import { GuardiaInfoPersonalComponent } from './components/guardia-info-personal/guardia-info-personal.component';
import { SupervisorListTurnosComponent } from './components/supervisor-list-turnos/supervisor-list-turnos.component';
import { SupervisorAddTurnosComponent } from './components/supervisor-add-turnos/supervisor-add-turnos.component';
import { SupervisorListEquiposComponent } from './components/supervisor-list-equipos/supervisor-list-equipos.component';
import { SupervisorAddGuardiaEquipoComponent } from './components/supervisor-add-guardia-equipo/supervisor-add-guardia-equipo.component';
import { AddGuardiaEquiposAdmComponent } from './components/add-guardia-equipos-adm/add-guardia-equipos-adm.component';
import { GuardiaListEquiposComponent } from './components/guardia-list-equipos/guardia-list-equipos.component';
import { GuardiaListTurnoComponent } from './components/guardia-list-turno/guardia-list-turno.component';
import { GuardiaAddServicioComponent } from './components/supervisor-add-servicio/guardia-add-servicio.component';
import { AdminNewServicioComponent } from './components/admin-new-servicio/admin-new-servicio.component';
import { AdminListServicioComponent } from './components/admin-list-servicio/admin-list-servicio.component';
import { GuardiaCalendarioComponent } from './components/guardia-calendario/guardia-calendario.component';
import { SupervisorCalendarioComponent } from './components/supervisor-calendario/supervisor-calendario.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { SupervisorAddEventoComponent } from './components/supervisor-add-evento/supervisor-add-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuarioAddComponent,
    UsuarioListComponent,
    UsuarioDescripcionComponent,
    UsuarioGuardiaListComponent,
    UsuarioSupervisorListComponent,
    LoginComponent,
    GuardiaProfileListComponent,
    SupervisorProfileListComponent,
    SupervisorAgregarGuardiaComponent,
    SupervisorListaGuardiasComponent,
    SupervisorUsuarioDescripcionComponent,
    GuardiaGuardiaDescripcionComponent,
    InformacionPersonalUsuarioComponent,
    ListaClienteAdmComponent,
    AddClienteAdmComponent,
    AddTurnosAdmComponent,
    ListaTurnosAdmComponent,
    ListaEquiposAdmComponent,
    AddEquiposAdmComponent,
    SupervisorInfoPersonalComponent,
    GuardiaInfoPersonalComponent,
    SupervisorListTurnosComponent,
    SupervisorAddTurnosComponent,
    SupervisorListEquiposComponent,
    SupervisorAddGuardiaEquipoComponent,
    AddGuardiaEquiposAdmComponent,
    GuardiaListEquiposComponent,
    GuardiaListTurnoComponent,
    GuardiaAddServicioComponent,
    AdminNewServicioComponent,
    AdminListServicioComponent,
    GuardiaCalendarioComponent,
    SupervisorCalendarioComponent,
    SupervisorAddEventoComponent,


  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    CalendarModule,
    ToastrModule.forRoot()
  
  ],
  providers: [
    UsuarioService,
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
