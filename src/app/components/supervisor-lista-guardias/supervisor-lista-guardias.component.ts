import { Component, OnInit,OnDestroy } from '@angular/core';
import { results } from 'src/app/interfaces/interfaces';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { usuario } from 'src/app/models/Usuario';
import { Subject } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-supervisor-lista-guardias',
  templateUrl: './supervisor-lista-guardias.component.html',
  styleUrls: ['./supervisor-lista-guardias.component.css']
 
})
export class SupervisorListaGuardiasComponent implements OnInit, OnDestroy {
  listUsuario: usuario[] = [];
  totalUsuario: number = 0;
  listResults: results[] = [];
  totalResults: number = 0;
  dtOptions: DataTables.Settings = {};
  datoUsuario=[];

  dtTrigger = new Subject();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
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
    this.obtenerGuardias();
    this.usuarioService.getResults().subscribe(data => {
      this.listResults = data.results;
      this.totalResults = data.total;
       this.dtTrigger.next();
       console.log(this.totalResults)
      });
      this.obtenerUsuario();
  }
  obtenerUsuario() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.totalUsuario = data.total;
     this.listUsuario = data.usuarios;

    }, error => {
      console.log(error);
    })
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
     this.router.navigate(['login'])
  }
  deleteUsuario(uid: string ) {
    Swal.fire({
      title: '¿eliminar Guardia?',
      text: "el guardia sera eliminado de forma permanente!",
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
        this.obtenerGuardias();
      },
        (err) => console.error(err)
      );
        Swal.fire(
          'Eliminado!',
          'Guardia Eliminado.',
          'success'
        )
      }
    })      
    }
    

  obtenerGuardias() {
    this.usuarioService.getResults().subscribe(data => {
      console.log(data)
     this.listResults = data.results;
     this.totalResults = data.total;
    }, error => {
      console.log(error);
    })
  }
}