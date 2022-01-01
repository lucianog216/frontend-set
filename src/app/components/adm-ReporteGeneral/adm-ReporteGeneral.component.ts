import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { UsuarioService } from '../../services/usuario.service';
import * as moment from 'moment';
@Component({
  selector: 'app-adm-ReporteGeneral',
  templateUrl: './adm-ReporteGeneral.component.html',
  styleUrls: ['./adm-ReporteGeneral.component.css']
})
export class AdmReporteGeneralComponent implements OnInit {
  //single: any[];
  public page: number;
  moment: any = moment;
  totalResults: number = 0;
  view: [number,number] = [700, 400];
  datoUsuario =[]
  listteams2 = []
  listclientes = []
  totalResultsGuardia =[]
  totalResultsSuper=[]
  // grafico
  totalEquipos: number = 0;
  totalGuardias: number = 0;
  totalSupervisores: number = 0;
  totalAdministradores: number = 0;
  totalClientes: number = 0;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Reporte General';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor(private usuarioService: UsuarioService,
    private router: Router ) {
  //  Object.assign(this, { single });
  }
     single = [];
     
  ngOnInit(): void {
this.obtenerUsuario()
this.obtenerTeams()
this.obtenerClientes()
this.obtenerSupervisores()
this.obtenerGuardia()
var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
  }
  obtenerSupervisores() {
    this.usuarioService.getResultsSupervisor().subscribe(data => {
     this.totalResultsSuper = data.results;
    
    }, error => {
      console.log(error);
    })
  }
  obtenerGuardia() {
    this.usuarioService.getResults().subscribe(data => {
     this.totalResultsGuardia = data.results;
     console.log(this.totalResultsGuardia)
    }, error => {
      console.log(error);
    })
  }
  obtenerClientes() {
    this.usuarioService.getClientes().subscribe(data => {
      this.listclientes = data.clientes;
      console.log('Clientes',this.listclientes)
    }, error => {
      console.log(error);
    })
  }

  obtenerTeams() {
    this.usuarioService.getTeams().subscribe(data => {
      this.listteams2 = data.teams;
      

    }, error => {
      console.log(error);
    })
  }
  obtenerUsuario() {
    this.usuarioService.getReporteGeneral().subscribe(data => {
      
      this.single = [];
      this.totalResults = data;
      this.totalEquipos= data.totalEquipos;
      this.totalGuardias = data.totalGuardias;
      this.totalSupervisores = data.totalSupervisores;
      this.totalAdministradores = data.total_administradores;
      this.totalClientes = data.total_clientes

    this.single.push({

      "name": "Equipos",
      "value": this.totalEquipos
    },
    {
      "name": "Guardias",
      "value": this.totalGuardias
    },
    {
      "name": "Supervisores",
      "value": this.totalSupervisores
    },
    {
      "name": "Administradores",
      "value": this.totalAdministradores
    },
    {
      "name": "Clientes",
      "value": this.totalClientes
    })
    console.log('Usuarios',this.totalResults)
    }, error => {
      console.log(error);
    }) 
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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

