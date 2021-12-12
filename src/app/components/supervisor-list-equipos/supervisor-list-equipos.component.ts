import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TeamRESP  } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-supervisor-list-equipos',
  templateUrl: './supervisor-list-equipos.component.html',
  styleUrls: ['./supervisor-list-equipos.component.css']
})
export class SupervisorListEquiposComponent implements OnInit {
  listteams: TeamRESP[] = [];

  totalteams: number = 0;
  datoUsuario=[];
  
  dtOptions: DataTables.Settings = {};
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
      console.log(datoNombre);
      
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

    this.obtenerTeams(); 
    this.usuarioService.getTeams().subscribe(data => {
       this.listteams = data.teams;

/*        var listteams2 = data.teams.guardias.nombre
       if(listteams2 == null){
        this.guardias=[];

      console.log("guardias",this.guardias);
       
      } */
       this.dtTrigger.next();
      });
      
  }
  obtenerTeams() {
    this.usuarioService.getTeams().subscribe(data => {
      this.totalteams = data.total;
      this.listteams = data.teams;
      console.log(this.listteams[0].guardias[1].nombre);

      var listteams2= data.teams[0].guardias
      if(listteams2 == null){
        
      }
      
    }, error => {
      console.log(error);
    })
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  deleteTeams(_id: string ) {
    Swal.fire({
      title: '¿eliminar Equipo?',
      text: "el Equipo sera eliminado de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteTeams(_id).subscribe(
        (res) => {
        this.obtenerTeams();
      },
        (err) => console.error(err)
      );
        Swal.fire(
          'Eliminado!',
          'Equipo Eliminado.',
          'success'
        )
      }
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


