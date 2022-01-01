import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TeamRESP  } from 'src/app/interfaces/interfaces';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-guardia-list-equipos',
  templateUrl: './guardia-list-equipos.component.html',
  styleUrls: ['./guardia-list-equipos.component.css']
})
export class GuardiaListEquiposComponent implements OnInit {
  moment: any = moment;
  listteams: TeamRESP[] = [];
  uid: string | null;
  totalteams: number = 0;
  datoUsuario=[];
  listteams2=[];
  apellidoUser=[];
  correoUser=[];
  celularUser=[];
  rolUser=[];
  datoTeam : string
  datos =[];
  datos2 =[]
  data3=[];
  data4=[];
  data5=[];
  data6=[];
  uidUser=[];
  teamid=[]
  imgUser=[];
  datoUid : string
  img=[];
  direccionUser=[];
  regionUser=[];
  ciudaduser =[];
  teamuser : string;
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
    this.obtenerTeams1();
    this.obtenerTurnero2();
    this.teamsid();
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
   
    var datociudad = localStorage.getItem('ciudad');
    if(datociudad == null){
      this.ciudaduser =[];
    }else{
      this.ciudaduser = JSON.parse(datociudad)
    }
    var datoteam = localStorage.getItem('team');
    if(datoteam == null){
     
    }else{
      this.teamuser = (datoteam)
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
      this.listteams2= data.teams[1].guardias;

      

      
      
    }, error => {
      console.log(error);
    })
  }

  obtenerTeams1() {
    var datoteam = localStorage.getItem ('team');
    if(datoteam == null){
      
    }else{
      this.teamuser = JSON.parse(datoteam)
      console.log(this.teamuser)
    }
    this.usuarioService.getTurneroTeams(this.teamuser).subscribe(data => {
      this.data3 = data.results[0];
      console.log(this.data3)
  }, error => {
    console.log(error);
  })
}

obtenerTurnero2() {
  var datoid = localStorage.getItem('team');
  if(datoid == null){
  }else{
    this.datoUid = JSON.parse(datoid)
    console.log(this.datoUid)
  }
    this.usuarioService.getTurnerosid(this.datoUid).subscribe(data => {
      console.log(data)
      this.data4 = data.results[0];
      for(let i=0;i<this.data4.length;i++){
        this.data5 = this.data4[i].usuario.nombre,
        this.data6 = this.data4[i].team.nombre
      }
      
  }, error => {
    console.log(error);
  })
}
teamsid(){
  var datoteam = localStorage.getItem ('team');
    if(datoteam == null){
      
    }else{
      this.teamuser = JSON.parse (datoteam)
      console.log(this.teamuser)
    }
    this.usuarioService.obtenerTeams(this.teamuser).subscribe(data => {
      this.teamid = data.team.guardias;
      this.datos = data.team.supervisor.nombre;
      this.datos2 = data.team.nombre;
      console.log('botas',this.datos2)
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
      localStorage.removeItem('uid');
      localStorage.removeItem('region');
      localStorage.removeItem('direccion');
      localStorage.removeItem('ciudad');
      localStorage.removeItem('team');
      this.router.navigate(['login'])
  }
}



