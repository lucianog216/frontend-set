import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TeamRESP  } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-guardia-list-equipos',
  templateUrl: './guardia-list-equipos.component.html',
  styleUrls: ['./guardia-list-equipos.component.css']
})
export class GuardiaListEquiposComponent implements OnInit {
  listteams: TeamRESP[] = [];
  uid: string | null;
  totalteams: number = 0;
  datoUsuario=[];
  apellidoUser=[];
  correoUser=[];
  celularUser=[];
  rolUser=[];
  uidUser=[];
  imgUser=[];
  img=[];
  direccionUser=[];
  regionUser=[];
  ciudaduser =[];
  teamuser=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.uid = localStorage.getItem('uid')
   }

  ngOnInit(): void {
     
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    };
    

    this.obtenerTeams(); 
    
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
      
    }
    var datoApellido = localStorage.getItem('apellido');
    if(datoApellido == null){
      this.apellidoUser =[];
    }else{
      this.apellidoUser = JSON.parse(datoApellido)
    }
    var datoCelular = localStorage.getItem('celular');
    if(datoCelular == null){
      this.celularUser =[];
    }else{
      this.celularUser = JSON.parse(datoCelular)
    }
    var datoCorreo = localStorage.getItem('correo');
    if(datoCorreo == null){
      this.correoUser =[];
    }else{
      this.correoUser = JSON.parse(datoCorreo)
    }
   /* var datoImg = localStorage.getItem('img');
    if(datoImg == null){
      this.imgUser =[];
      console.log(this.imgUser);
    }else{
      this.imgUser = JSON.parse(datoImg)
    }*/
    var datociudad = localStorage.getItem('ciudad');
    if(datociudad == null){
      this.ciudaduser =[];
    }else{
      this.ciudaduser = JSON.parse(datociudad)
    }
    var datoteam = localStorage.getItem('team');
    if(datoteam == null){
      this.teamuser =[];
    }else{
      this.teamuser = JSON.parse(datoteam)
    }
    var datoregion = localStorage.getItem('region');
    if(datoregion == null){
      this.regionUser =[];
    }else{
      this.regionUser = JSON.parse(datoregion)
    }
    var datodireccion = localStorage.getItem('direccion');
    if(datodireccion == null){
      this.direccionUser =[];
    }else{
      this.direccionUser = JSON.parse(datodireccion)
    }
    
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



