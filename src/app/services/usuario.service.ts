import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { usuario } from '../models/Usuario';
import {  img, servicio, teamguard, TESTRESP, turnos, turneros, IEvent2, teamcliente, borrarGuardiaEquipo, evet2 } from '../interfaces/interfaces';
import { clientes } from '../interfaces/interfaces';
import { teams } from '../interfaces/interfaces';
import { Turnos } from '../models/Turnos';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 


   url = 'http://localhost:8080/api/usuarios?limite=0';
   url2 = 'http://localhost:8080/api/usuarios/';
   url3 = 'http://localhost:8080/api/buscar/guardias/all/';
   url4 = 'http://localhost:8080/api/clientes/';
   url5 = 'http://localhost:8080/api/turnos/';
   url6 = 'http://localhost:8080/api/teams/';
   url7 = 'http://localhost:8080/api/teams/add/';
   url8 = 'http://localhost:8080/api/buscar/supervisor/all';
   url9 = 'http://localhost:8080/api/regiones?limite=0';
   url10 = 'http://localhost:8080/api/uploads/usuarios/';
   url11 ='http://localhost:8080/api/teams/del/';
   url12 = 'http://localhost:8080/api/uploads/usuarios/';
   url13 = 'http://localhost:8080/api/servicios/';
   url14 = 'http://localhost:8080/api/reportes/'
   url15 = 'http://localhost:8080/api/turneros/';
   url16 = 'http://localhost:8080/api/buscar/turnos/';
   url17 = 'http://localhost:8080/api/buscar/turnos/';
   url18 = 'http://localhost:8080/api/teams/aCliente/add/';
   url19 = 'http://localhost:8080/api/turneros/in/';
   url20 = 'http://localhost:8080/api/turneros/out/';
   url21 = 'http://localhost:8080/api/buscar/teams2/';
   url22 = 'http://localhost:8080/api/buscar/clientes2/';
   url23 = 'http://localhost:8080/api/turneros/';
   url24 = 'http://localhost:8080/api/reportes/totales/all';
   url25 = 'http://localhost:8080/api/servicios/';
   url26 = 'http://localhost:8080/api/reportes/rptTurnos/';
   url27 = 'http://localhost:8080/api/reportes/rptTeams/guardias';
   url28 = 'http://localhost:8080/api/reportes/rptTurnosHs/'

  constructor( private http: HttpClient) {
   }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }
  deleteUsuarios(uid: string) {
    return this.http.delete(this.url2 + uid); 
  }
  postUsuarios(usuario: usuario): Observable<any> {
    return this.http.post(this.url2, usuario);
  }
  obtenerUsuario(uid: string): Observable<any> {
    return this.http.get(this.url2 + uid);
  }
  editarUsuario(uid: string, usuario:usuario): Observable<any>{
    return this.http.put(this.url2 + uid, usuario)
  }
  //obtener Guardia
  getResults(): Observable<any> {
    return this.http.get(this.url3);
  }
  //Cliente
  getClientes():Observable<any> {
    return this.http.get(this.url4);
  }
  postCliente(clientes: clientes): Observable<any> {
    return this.http.post(this.url4, clientes);
  }
  deleteClientes(_id: string) {
    return this.http.delete(this.url4 + _id); 
  }
  editarCliente(_id: string, clientes:clientes): Observable<any>{
    return this.http.put(this.url4 + _id, clientes)
  }
  obtenerClientes(_id: string): Observable<any> {
    return this.http.get(this.url4 + _id);
  }
  // Turnos
  getTurnos():Observable<any> {
    return this.http.get(this.url5);
  }
  postTurnos(turnos: turnos): Observable<any> {
    return this.http.post(this.url5, turnos);
  }
  deleteTurnos(_id: string) {
    return this.http.delete(this.url5 + _id); 
  }
  editarTurnos(_id: string, turnos:turnos): Observable<any>{
    return this.http.put(this.url5 + _id, turnos)
  }
  obtenerTurnos(_id: string): Observable<any> {
    return this.http.get(this.url5 + _id);
  }
  // Teams
  getTeams() {
    return this.http.get<any>(this.url6);
  }
  postTeams(teams: teams): Observable<any> {
    return this.http.post(this.url6, teams);
  }
  deleteTeams(_id: string) {
    return this.http.delete(this.url6 + _id); 
  }
  editarTeams(_id: string, teams:teams): Observable<any>{
    return this.http.put(this.url6 + _id, teams)
  }
  obtenerTeams(_id: string): Observable<any> {
    return this.http.get(this.url6 + _id);
  }
  //agregar y eliminar guardias a teams
  addGuardiaTeams(uid: string, _id:teamguard): Observable<any>{
    return this.http.put(this.url7 + uid, _id)
  }
  deleteGuardia_teams( guardiadelete :borrarGuardiaEquipo, listteams69:string ): Observable<any>{
    return this.http.put(this.url11 + guardiadelete, listteams69 ); 
  }
  //supervisores
  getResultsSupervisor(): Observable<any> {
    return this.http.get(this.url8);
  }
  //Regiones
  getRegiones():Observable<any> {
    return this.http.get(this.url9);
  }
  //imagenes
  obtenerimg(uid: string ){
    return this.http.get<any>(this.url10 );
  }
  CargarImagen(uid: string, archivo:img): Observable<any>{
    return this.http.put(this.url12 + uid, archivo)
  }
 //servicio

 postServicio(servicio: servicio): Observable<any> {
  return this.http.post(this.url13, servicio);
}
 getServicio() {
  return this.http.get<any>(this.url13);
}
getServicio1() {
  return this.http.get<IEvent2>(this.url13);
}
getServicioID (id: string): Observable<any> {
  return this.http.get(this.url25 + id); 
}
getReport(): Observable<any> {
  return this.http.get(this.url14);
}
//turnero
postTurneros(turneros: turneros): Observable<any> {
  return this.http.post(this.url15, turneros);
}
getTurneros():Observable<any> {
  return this.http.get(this.url15);
}
deleteTurnero (id: string) {
  return this.http.delete(this.url23 + id); 
}
// turno por id
getTurneroid(id: string): Observable<any> {
  return this.http.get(this.url15 + id);
}
// turno por guardia
getTurnerosid(_id: string): Observable<any> {
  return this.http.get(this.url16 + _id);
}
//turno por equipo
getTurneroTeams(teamuser: string): Observable<any> {
  return this.http.get(this.url17 + teamuser);
}
//agregar cliente a teams
AddClienteaTeams(uid: string, _id:teamcliente): Observable<any>{
  return this.http.put(this.url18 + uid, _id)
}
// ingreso y salida de turno
ingresoTurno(idguardia: string): Observable<any> {
  return this.http.put(this.url19 + idguardia, idguardia);
}
salidaTurno(idguardia: string): Observable<any> {
  return this.http.put(this.url20 + idguardia, idguardia);
}
//teamsXsupervisor 
getTeamXsupervisor(id: string): Observable<any> {
  return this.http.get(this.url21 + id);
}
//clientesXequipo
getTeamXcliente(id: string): Observable<any> {
  return this.http.get(this.url22 + id);
}
//reporte general
getReporteGeneral():Observable<any> {
  return this.http.get(this.url24);
}
TurnosXguardias(_id: string, TEAMS:evet2): Observable<any> {
  return this.http.post(this.url26 + _id, TEAMS);
}
//reporte guarediaXteam
getrptGuardiaXteam(): Observable<any> {
  return this.http.get(this.url27);
}
//turnos true y false 
getGeneralTurnos(_id: string): Observable<any> {
  return this.http.get(this.url28 + _id);
}
// turno por id X reporte
getTurneroIDReporte(id: string): Observable<any> {
  return this.http.get(this.url15 + id);
}
}
