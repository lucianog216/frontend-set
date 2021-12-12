import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Turnos } from 'src/app/models/Turnos';
@Component({
  selector: 'app-guardia-add-servicio',
  templateUrl: './guardia-add-servicio.component.html',
  styleUrls: ['./guardia-add-servicio.component.css']
})
export class GuardiaAddServicioComponent implements OnInit {
  datoUsuario=[];
  listturnos: Turnos[] = [];
  totalturnos: number = 0;

  constructor( private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {


    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

    this.obtenerTurnos(); 
    

    this.usuarioService.getTurnos().subscribe(data => {
       this.listturnos = data.turnos;
       
      });
  }

  obtenerTurnos() {
    this.usuarioService.getTurnos().subscribe(data => {
      this.totalturnos = data.totalturnos;
      this.listturnos = data.turnos;
      console.log(this.listturnos)
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
    localStorage.removeItem('uid')
    this.router.navigate(['login'])
  }
}
