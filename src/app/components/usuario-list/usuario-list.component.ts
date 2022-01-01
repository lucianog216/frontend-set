import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {Router} from '@angular/router'
import * as jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { Results, results } from 'src/app/interfaces/interfaces';

import {AuthService} from '../../services/auth.service'
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/interfaces/interfaces';
import { usuario } from 'src/app/models/Usuario';
import { LocalizedString } from '@angular/compiler';



@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  providers:[UsuarioService]
})
export class UsuarioListComponent implements OnDestroy, OnInit {

  listUsuario = [];
  listResults: results[] = [];
  listResultsSuper: Results[] = [];
  totalResultsSuper: number = 0;
  totalclientes: number = 0;
  totalUsuario: number = 0;
  totalResults: number = 0;
  datoUsuario=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
 


  constructor( private usuarioService: UsuarioService, 
    private authService: AuthService, 
    private router: Router) {
  
   }

  ngOnInit(){
    this.obtenerUsuario();
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
    this.usuarioService.getUsuarios().subscribe(data => {
       this.listUsuario = data.usuarios;
       this.dtTrigger.next();
      });
    this.obtenerGuardias();
    this.obtenerClientes();
    this.obtenerSupervisores();

    
      
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
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
  
  obtenerUsuario() {
    this.usuarioService.getUsuarios().subscribe(data => {
     this.totalUsuario = data.total;
     this.listUsuario = data.usuarios;
     
    }, error => {
      console.log(error);
    })
  }
  obtenerGuardias() {
    this.usuarioService.getResults().subscribe(data => {
      this.totalResults = data.total;
      this.listResults = data.results;
      
    }, error => {
      console.log(error);
    })
  }
  obtenerSupervisores() {
    
    this.usuarioService.getResultsSupervisor().subscribe(data => {
     this.listResultsSuper = data.results;
     this.totalResultsSuper = data.total;
    }, error => {
      console.log(error);
     
    })
  }
  obtenerClientes() {
    this.usuarioService.getClientes().subscribe(data => {
      this.totalclientes = data.total;
    }, error => {
      console.log(error);
    })
  }
  deleteUsuario(uid: string ) {

    Swal.fire({
      title: '¿eliminar usuario?',
      text: "el usuario sera eliminado de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuarios(uid).subscribe(
        (res) => {
        this.obtenerUsuario();
      },
        (err) => console.error(err)
      );
        Swal.fire(
          'Eliminado!',
          'Usuario Eliminado.',
          'success'
        )
      }
    })      
    }
  getreport( ) {



    this.usuarioService.getReport().subscribe(
      (res) => {
      this.obtenerUsuario();
       },
       (err) => console.error(err)
     );
    
   
  }

}
