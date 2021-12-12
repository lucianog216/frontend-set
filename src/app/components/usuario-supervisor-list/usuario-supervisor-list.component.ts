import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Results } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-usuario-supervisor-list',
  templateUrl: './usuario-supervisor-list.component.html',
  styleUrls: ['./usuario-supervisor-list.component.css']
})
export class UsuarioSupervisorListComponent implements OnInit {
  
  loading = true;
  listResults: Results[] = [];
  dtOptions: DataTables.Settings = {};
  datoUsuario=[];
  dtTrigger = new Subject();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
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
    
    this.obtenerSupervisores();
    this.usuarioService.getResultsSupervisor().subscribe(data => {
      //this.loading = true;
      this.listResults = data.results;
      console.log(this.listResults);
      
       this.dtTrigger.next();
       this.loading = false;
      });
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
    this.router.navigate(['login'])
  }

  obtenerSupervisores() {
    //this.loading = true;
    this.usuarioService.getResultsSupervisor().subscribe(data => {
     this.listResults = data.results;
     this.loading = false;
    }, error => {
      console.log(error);
      //this.loading = false;
    })
  }

  deleteUsuario(uid: string ) {

    Swal.fire({
      title: '¿eliminar guardia?',
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
        this.obtenerSupervisores();
      },
        (err) => console.error(err)
      );  
        Swal.fire(
          'Eliminado!',
          'guardia Eliminado.',
          'success'
        )
      }
    })      
    }


}
