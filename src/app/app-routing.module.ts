import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioListComponent } from './components/usuario-list/usuario-list.component'
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component' 
import { UsuarioDescripcionComponent } from './components/usuario-descripcion/usuario-descripcion.component'
import {UsuarioGuardiaListComponent} from './components/usuario-guardia-list/usuario-guardia-list.component' 
import {UsuarioSupervisorListComponent} from './components/usuario-supervisor-list/usuario-supervisor-list.component'
import {LoginComponent} from './components/login/login.component'
import {GuardiaProfileListComponent} from './components/guardia-profile-list/guardia-profile-list.component'
import {SupervisorProfileListComponent} from './components/supervisor-profile-list/supervisor-profile-list.component'
import {AuthGuard} from './auth.guard'
import { ValidateRolAdminGuard } from './validate-rol-admin.guard';
import { ValidateRolSupervisorGuard } from './validate-rol-supervisor.guard';
import {SupervisorAgregarGuardiaComponent} from  './components/supervisor-agregar-guardia/supervisor-agregar-guardia.component'
import {SupervisorListaGuardiasComponent} from './components/supervisor-lista-guardias/supervisor-lista-guardias.component'
import {SupervisorUsuarioDescripcionComponent} from './components/supervisor-usuario-descripcion/supervisor-usuario-descripcion.component'
import {GuardiaGuardiaDescripcionComponent} from  './components/guardia-guardia-descripcion/guardia-guardia-descripcion.component'
import {InformacionPersonalUsuarioComponent} from './components/informacion-personal-usuario/informacion-personal-usuario.component'
import {ListaClienteAdmComponent} from './components/lista-cliente-adm/lista-cliente-adm.component'
import {AddClienteAdmComponent} from './components/add-cliente-adm/add-cliente-adm.component'
import { ListaTurnosAdmComponent } from './components/lista-turnos-adm/lista-turnos-adm.component';
import { AddTurnosAdmComponent } from './components/add-turnos-adm/add-turnos-adm.component';
import { ListaEquiposAdmComponent } from './components/lista-equipos-adm/lista-equipos-adm.component';
import { AddEquiposAdmComponent } from './components/add-equipos-adm/add-equipos-adm.component';
import { GuardiaInfoPersonalComponent } from './components/guardia-info-personal/guardia-info-personal.component';
import { SupervisorInfoPersonalComponent } from './components/supervisor-info-personal/supervisor-info-personal.component';
import { SupervisorListTurnosComponent } from './components/supervisor-list-turnos/supervisor-list-turnos.component';
import { SupervisorAddTurnosComponent } from './components/supervisor-add-turnos/supervisor-add-turnos.component';
import { SupervisorListEquiposComponent } from './components/supervisor-list-equipos/supervisor-list-equipos.component';
import { SupervisorAddGuardiaEquipoComponent } from './components/supervisor-add-guardia-equipo/supervisor-add-guardia-equipo.component';
import { AddGuardiaEquiposAdmComponent } from './components/add-guardia-equipos-adm/add-guardia-equipos-adm.component';
import { GuardiaListTurnoComponent } from './components/guardia-list-turno/guardia-list-turno.component';
import { GuardiaListEquiposComponent } from './components/guardia-list-equipos/guardia-list-equipos.component';
import { GuardiaAddServicioComponent } from './components/supervisor-add-servicio/guardia-add-servicio.component';
import { AdminNewServicioComponent } from './components/admin-new-servicio/admin-new-servicio.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminListServicioComponent } from './components/admin-list-servicio/admin-list-servicio.component';
import { GuardiaCalendarioComponent }from './components/guardia-calendario/guardia-calendario.component'
import {SupervisorCalendarioComponent} from './components/supervisor-calendario/supervisor-calendario.component'
import {SupervisorAddEventoComponent} from './components/supervisor-add-evento/supervisor-add-evento.component'
import { Supervisor_turnerosComponent } from './components/supervisor_turneros/supervisor_turneros.component';
import { SupervisorListaguardiaEquipoComponent } from './components/supervisor-listaguardia-equipo/supervisor-listaguardia-equipo.component';
import { SupervisorTurnosListComponent } from './components/supervisor-turnos-list/supervisor-turnos-list.component';



//TODO:FALTA RUTAS ADMIN, GUARDIAS, SUPERVISOR  
//TODO:marcar las rutas que SI se van a usar, quedar fuera del rol del usuario
const routes: Routes = [
  
  {
path: '',
redirectTo:'login',
pathMatch: 'full',
  },

  {
    path:'usuario',
    component: UsuarioListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/lista_turno',
    component: ListaTurnosAdmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/add_turno',
    component: AddTurnosAdmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/servicio_list',
    component: AdminListServicioComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'usuario/lista_equipo',
    component: ListaEquiposAdmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/delete_GuardEquipo/:_id',
    component: NavigationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/add_equipo',
    component: AddEquiposAdmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/lista_cliente',
    component: ListaClienteAdmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/add_cliente',
    component: AddClienteAdmComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'usuario/informcacion_personal_usuario',
    component: InformacionPersonalUsuarioComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'guardia/list',
    component:GuardiaProfileListComponent,
    canActivate: [ValidateRolSupervisorGuard]
  },
  {
    path:'guardia/list_turno',
    component:GuardiaListTurnoComponent,
    canActivate: [ValidateRolSupervisorGuard]
  },
  {
    path:'guardia/calendario',
    component: GuardiaCalendarioComponent,
    canActivate: [ValidateRolSupervisorGuard]
  },
  {
    path:'supervisor/servicio_add',
    component:GuardiaAddServicioComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'supervisor/turno_listas',
    component:SupervisorTurnosListComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'supervisor/CalendarioMañana',
    component:SupervisorCalendarioComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'guardia/list_equipos',
    component:GuardiaListEquiposComponent,
    canActivate: [ValidateRolSupervisorGuard]
  },
  {
    path:'guardia/info_personal',
    component:GuardiaInfoPersonalComponent,
    canActivate: [ValidateRolSupervisorGuard]
  },
  {
    path:'supervisor/list',
    component:SupervisorProfileListComponent,
    canActivate: [ValidateRolAdminGuard]
    
  },
  {
    path:'supervisor/add_turnos',
    component:SupervisorAddTurnosComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'supervisor/list_equipos',
    component:SupervisorListEquiposComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'supervisor/list_turnos',
    component:SupervisorListTurnosComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'supervisor/listGuardia_equipo/:_id',
    component: SupervisorListaguardiaEquipoComponent,
    canActivate: [ValidateRolAdminGuard]
  
  },
  {
    path:'supervisor/addGuardia_equipo/:_id',
    component: SupervisorAddGuardiaEquipoComponent,
    canActivate: [ValidateRolAdminGuard]
  
  },
  {
    path:'supervisor/editar_turno/:_id',
    component: SupervisorAddTurnosComponent,
    canActivate: [ValidateRolAdminGuard]
  
  },
  {
    path:'supervisor/info_personal',
    component:SupervisorInfoPersonalComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'supervisor/AgregarGuardia',
    component:SupervisorAgregarGuardiaComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
    path:'guardia/editar/:uid',
    component:SupervisorAgregarGuardiaComponent,
    canActivate: [ValidateRolAdminGuard]
  },
  {
  path:'usuario/add',
  component: UsuarioAddComponent,
  canActivate: [AuthGuard ]
},
{
  path:'usuario/servicio',
  component: AdminNewServicioComponent,
  canActivate: [AuthGuard ]
},
{
  path:'usuario/editar/:uid',
  component: UsuarioAddComponent,
  canActivate: [AuthGuard]
},
{
  path:'usuario/editar_cliente/:_id',
  component: AddClienteAdmComponent ,
  canActivate: [AuthGuard]

},
{
  path:'usuario/editar_turno/:_id',
  component: AddTurnosAdmComponent,
    canActivate: [AuthGuard]

},
{
  path:'usuario/add_Guardia_Equipo_equipo/:_id',
  component: AddGuardiaEquiposAdmComponent,
    canActivate: [AuthGuard]

},
{
  path:'usuario/editar_equipo/:_id',
  component: AddEquiposAdmComponent,
    canActivate: [AuthGuard]

},
{
  path:'supervisor/lista_guardia',
  component: SupervisorListaGuardiasComponent,
  canActivate: [ValidateRolAdminGuard]

},
{
  path:'usuario/descripcion/:uid',
  component: UsuarioDescripcionComponent,
  canActivate: [AuthGuard]
},
{
  path:'supervisor/usuariodescripcion/:uid',
  component:SupervisorUsuarioDescripcionComponent,
  canActivate: [ValidateRolAdminGuard]
},
{
  path:'supervisor/turnero',
  component:Supervisor_turnerosComponent,
  canActivate: [ValidateRolAdminGuard]
},
{
  path:'supervisor/calendario_evento',
  component:SupervisorAddEventoComponent,
  canActivate: [ValidateRolAdminGuard]
},
{
  path:'guardia/usuariodescripcion/:uid',
  component:GuardiaGuardiaDescripcionComponent,
  canActivate: [ValidateRolSupervisorGuard]

},
 {
  path:'usuario/usuario_guardia_lista/:_id',
  component: UsuarioGuardiaListComponent,
  canActivate: [AuthGuard]

},
{
  path: 'usuario/usuario_supervisor_lista/:_id',
  component: UsuarioSupervisorListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
