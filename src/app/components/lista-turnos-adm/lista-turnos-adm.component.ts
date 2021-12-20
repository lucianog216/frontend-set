import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Turnos } from 'src/app/models/Turnos';
@Component({
  selector: 'app-lista-turnos-adm',
  templateUrl: './lista-turnos-adm.component.html',
  styleUrls: ['./lista-turnos-adm.component.css'],
  providers:[UsuarioService]
})
export class ListaTurnosAdmComponent implements OnInit {
  listturnos: Turnos[] = [];
  totalturnos: number = 0;
  datoUsuario=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(){
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    };
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
    this.obtenerTurnos(); 
    

    this.usuarioService.getTurnos().subscribe(data => {
       this.listturnos = data.turnos;
       this.dtTrigger.next();
      });
      
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  deleteTurnos(_id: string ) {
    Swal.fire({
      title: '¿eliminar Turno?',
      text: "el Turno sera eliminado de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteTurnos(_id).subscribe(
        (res) => {
        this.obtenerTurnos();
      },
        (err) => console.error(err)
      );
        Swal.fire(
          'Eliminado!',
          'Turno Eliminado.',
          'success'
        )
      }
    })      
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
      localStorage.removeItem('uid');
      localStorage.removeItem('region');
      localStorage.removeItem('direccion');
      localStorage.removeItem('ciudad');
      localStorage.removeItem('team');
      this.router.navigate(['login'])
  }
}

