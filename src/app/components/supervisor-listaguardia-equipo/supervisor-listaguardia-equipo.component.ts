import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RESTListarUsuario, TeamRESP, IEvent } from 'src/app/interfaces/interfaces';
import{FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray} from '@angular/forms'
import { teams, Results,teamguard } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service'
import { Subject } from 'rxjs';
import { Turnos } from 'src/app/models/Turnos';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import 'moment/locale/es';
@Component({
  selector: 'app-supervisor-listaguardia-equipo',
  templateUrl: './supervisor-listaguardia-equipo.component.html',
  styleUrls: ['./supervisor-listaguardia-equipo.component.css']
})
export class SupervisorListaguardiaEquipoComponent implements OnInit {
  moment: any = moment;
  listteams: TeamRESP[] = [];
  totalteams: number = 0;
  listturnos: Turnos[] = [];
  listResults: Results[] = [];
  listResults1: Results[] = [];
  totalResults: number = 0;
  listteams2= [];
  listteams3=[];
  datoUsuario=[];
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
        nombre: ['', Validators.required],
        guardias: ['', Validators.required],
      
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
      }

  ngOnInit(): void {
    
    this.teamsForm= new FormGroup({

      nombre: new FormControl(),

        guardias: new FormGroup({
          _id: new FormControl(),
           nombre: new FormControl(),
           apellido: new FormControl(),
        })

    })
    this.obtenerSupervisores()
    this.geteditarTeams()
    this.obtenerGuardias()

    
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
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
    

      var listteams2= data.teams[0].guardias
      if(listteams2 == null){
        
      }
      
    }, error => {
      console.log(error);
    })
  }
  addTeams(){
    console.log(this.teamsForm)
    console.log(this.teamsForm.get('turnos')?.value);

    const TEAMSGUARD : teamguard = {
      guardia: this.teamsForm.get('guardia')?.value,
      nombre: this.teamsForm.get('')?.value,
      guardias: this.teamsForm.get('')?.value,
      apellido: this.teamsForm.get('')?.value,
      correo: this.teamsForm.get('')?.value,
      ciudad: this.teamsForm.get('')?.value,
      
    }
    if (this._id !== null){
      this.usuarioService.addGuardiaTeams(this._id, TEAMSGUARD ).subscribe(data =>{
        console.log(data);
        
      })
      this.toastr.info('El Guardia fue Agregado con exito!', 'Equipo actualizado');
      this.router.navigate(['/usuario/lista_equipo'])  
    
  }
}

obtenerSupervisores() {

  this.usuarioService.getResultsSupervisor().subscribe(data => {
   this.listResults = data.results;
  }, error => {
    console.log(error)
  })
}
obtenerGuardias() {
  this.usuarioService.getResults().subscribe(data => {
   this.listResults1 = data.results;
   
   
  }, error => {
    console.log(error);
  })
}

//obtener y editar
geteditarTeams(): void{
  if(this._id !== null) {
    this.titulo = 'Editar Equipo';
    this.usuarioService.getTurneroTeams(this._id).subscribe(data =>{

      this.listteams3 = data.results[0]; 
      console.log(this.listteams3)

    })
    
  }
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
      this.obtenerGuardias();
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


