import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { borrarGuardiaEquipo, TeamRESP } from 'src/app/interfaces/interfaces';
import{FormBuilder, FormGroup, Validators} from '@angular/forms'
import { teams, Results, teamguard } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service'
import { Subject } from 'rxjs';
import { Turnos } from 'src/app/models/Turnos';
import * as moment from 'moment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-supervisor-add-guardia-equipo',
  templateUrl: './supervisor-add-guardia-equipo.component.html',
  styleUrls: ['./supervisor-add-guardia-equipo.component.css']
})
export class SupervisorAddGuardiaEquipoComponent implements OnInit {
  moment: any = moment;
  public page: number;
  listteams: TeamRESP[] = [];
  totalteams: number = 0;
  listturnos: Turnos[] = [];
  listResults: Results[] = [];
  listResults1: Results[] = [];
  totalResults: number = 0;
  listteams2= [];
  datoUsuario=[];
  listteams3=[];
  listteams69:string
  listResultsg2=[]
  datouid: string;
  datoteams: string;
  teamsForm: FormGroup;
  titulo = 'Agregar Equipo';
  _id: string | null;
  loading = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,   
    private authService: AuthService,  
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute ) {
      this.teamsForm = this.fb.group({ 
        guardia: ['', Validators.required], 
        
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
      }


  ngOnInit(): void {
    
    console.log(this.teamsForm)
    this.obtenerSupervisores()
    this.obtenerGuardias2();
    this.obtenerGuardias()
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
    

    var datoUid = localStorage.getItem('uid');
    if(datoUid == null){
    }else{
      this.datouid = (datoUid)
      console.log('gatooooo',this.datouid );
    }
    this.usuarioService.getTeamXsupervisor(this.datouid).subscribe(data => {
       this.listteams69 = data.results[0];
       console.log('gatooooo',this.listteams2 );

     
      });
    

  }
  
  obtenerTeams() {
    this.usuarioService.getTeams().subscribe(data => {
      this.totalteams = data.total;
      this.listteams = data.teams;
    }, error => {
      console.log(error);
    })
  }
  obtenerGuardias(): void{
    if(this._id !== null) {
      this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
        this.listteams3 = data.team.guardias;
        console.log('guardiaaas',this.listteams3)
        this.teamsForm.patchValue({
          nombre : data.team.nombre,
          guardias:{
             nombre : data.team.guardias.nombre,
             _id : data.team.guardias._id,
             apellido : data.team.guardias.apellido,
          }
        })
      })
    }
  }
  obtenerGuardias2(): void{
    this.usuarioService.getResults().subscribe(data => {
      this.listResultsg2 = data.results;
      console.log('esooo',this.listResultsg2)
     }, error => {
       console.log(error)
     })
   }

  addTeams(){
    console.log(this.teamsForm)
    console.log(this.teamsForm.get('turnos')?.value);

    const TEAMSGUARD : teamguard = {
      guardia: this.teamsForm.get('guardia')?.value,
      nombre: this.teamsForm.get('nombre')?.value,
      guardias: this.teamsForm.get('guardias')?.value,
      apellido: this.teamsForm.get('apellido')?.value,
      correo: this.teamsForm.get('correo')?.value,
      ciudad: this.teamsForm.get('ciudad')?.value,
    }
    if (this._id !== null){
      this.usuarioService.addGuardiaTeams(this._id, TEAMSGUARD ).subscribe(data =>{
        console.log(data);
        
      })
      this.toastr.info('El Guardia fue Agregado con exito!', 'Equipo actualizado');
      this.router.navigate(['supervisor/list_equipos'])  
    
  }else{
    this.router.navigate(['supervisor/list_equipos']) 
  }
}
obtenerSupervisores() {

  this.usuarioService.getResultsSupervisor().subscribe(data => {
   this.listResults = data.results;
  }, error => {
    console.log(error)
  })
}

borrarguardia(_id: string ) {

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

    const guardiadelete : borrarGuardiaEquipo = {

      guardia: this.teamsForm.get(_id)?.value,
    }
    if (result.isConfirmed) {
      this.usuarioService.deleteGuardia_teams(guardiadelete, this.listteams69).subscribe(
        
      (res) => {
        console.log('team:', this.datouid)
        console.log('guardia:', guardiadelete)

        this.router.navigate(['supervisor/list_equipos'])  
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


