import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-adm-reporte-guardia',
  templateUrl: './adm-reporte-guardia.component.html',
  styleUrls: ['./adm-reporte-guardia.component.css']
})
export class AdmReporteGuardiaComponent implements OnInit {
  moment: any = moment;
  date: String;
  datoUsuario =[]
  id: string | null;

  guardianombre = []
  guardiaApellido =[]
  guardiaCorreo = []
  guardiaCiudad = []
  guardiaDireccion = []
  guardiaCelular = []
  cliente = []
  fecha = []
  ingreso = []
  salida = []
  turno = []
  supervisor = []
  equipo = []
  estado = []
  horas = []
  totalhoras = []
  idguardia:string
  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private aRouter: ActivatedRoute,) {
      this.id = this.aRouter.snapshot.paramMap.get('id'); 
     }

  ngOnInit() {
    
    this.date = moment(new Date()).format('DD-MM-YYYY');
    console.log(moment(new Date()).format('YYYY'));

    this.obtenerTurno()
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
    

  }

  obtenerTurno(){
    
      if(this.id !== null) {
        
        this.usuarioService.getTurneroid(this.id).subscribe(data =>{
          
    
          this.guardianombre = data.guardia.nombre
          this.guardiaApellido = data.guardia.apellido
          this.guardiaCorreo = data.guardia.correo
          this.guardiaCiudad = data.guardia.ciudad
          this.guardiaDireccion= data.guardia.direccion
          this.guardiaCelular = data.guardia.celular

          this.cliente = data.cliente.nombre
          this.fecha = data.inicio
          this.ingreso = data.turno.ingreso
          this.salida = data.turno.salida
          this.turno = data.turno.nombre
          this.supervisor = data.usuario.nombre
          this.equipo = data.team.nombre
          this.estado = data.estado
          this.horas = data.turno.horas
          this.totalhoras = data.guardia.totalHoras
          this.idguardia = data.id
          console.log('gatooo',data )
        })
      }
    



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
