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
//import { CalendarModule } from 'primeng/calendar';
import { SupervisorAddEventoComponent } from './components/supervisor-add-evento/supervisor-add-evento.component';
import { Supervisor_turnerosComponent } from './components/supervisor_turneros/supervisor_turneros.component';
import { SupervisorListaguardiaEquipoComponent } from './components/supervisor-listaguardia-equipo/supervisor-listaguardia-equipo.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import{  MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdmReporteGeneralComponent } from './components/adm-ReporteGeneral/adm-ReporteGeneral.component';
import { AdmReporteTeamGuardiaComponent } from './components/adm-reporte-TeamGuardia/adm-reporte-TeamGuardia.component';
import { AdmReporteListguardiaComponent } from './components/adm-reporte-listguardia/adm-reporte-listguardia.component';
import { AdmReporteEquipoCalendarioTurnoComponent } from './components/adm-reporte-equipo-calendarioTurno/adm-reporte-equipo-calendarioTurno.component';
import { AdmReporteGuardiaComponent } from './components/adm-reporte-guardia/adm-reporte-guardia.component';
import { AdmEquipoReportesComponent } from './components/adm-equipo-reportes/adm-equipo-reportes.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

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
    Supervisor_turnerosComponent,
    SupervisorListaguardiaEquipoComponent,
    AdmReporteGeneralComponent,
    AdmReporteTeamGuardiaComponent,
    AdmReporteListguardiaComponent,
    AdmReporteEquipoCalendarioTurnoComponent,
    AdmReporteGuardiaComponent,
    AdmEquipoReportesComponent,
    

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    CalendarModule,
    NgxPaginationModule,
    NgxChartsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  
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
