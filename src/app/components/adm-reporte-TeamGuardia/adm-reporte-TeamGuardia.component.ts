import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-adm-reporte-TeamGuardia',
  templateUrl: './adm-reporte-TeamGuardia.component.html',
  styleUrls: ['./adm-reporte-TeamGuardia.component.css']
})
export class AdmReporteTeamGuardiaComponent implements OnInit {
  moment: any = moment;
  listteams2=[]
  datoUsuario =[]
  constructor( private usuarioService: UsuarioService,
    private router: Router, ) { }

  ngOnInit() {
  this.obtenerTeams()

  var datoNombre = localStorage.getItem('nombre');
  if(datoNombre == null){
    this.datoUsuario =[];
    console.log(datoNombre);
    
  }else{
    this.datoUsuario = JSON.parse(datoNombre)
  }
  }

  obtenerTeams() {
    this.usuarioService.getTeams().subscribe(data => {
      this.listteams2 = data.teams;
      console.log(this.listteams2 );

      
      
    }, error => {
      console.log(error);
    })
  }

  logout(){
    localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('nombre');
      localStorage.removeItem('correo');
      localStorage.removeItem('apellido');
      localStorage.removeItem('celular');
      localStorage.removeItem('uid');
      localStorage.removeItem('region');
      localStorage.removeItem('direccion');
      localStorage.removeItem('ciudad');
      localStorage.removeItem('team');
      this.router.navigate(['login'])
  }

}
