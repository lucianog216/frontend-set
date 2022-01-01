import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RESTListarUsuario, TeamRESP } from 'src/app/interfaces/interfaces';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { teams, Results } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-add-equipos-adm',
  templateUrl: './add-equipos-adm.component.html',
  styleUrls: ['./add-equipos-adm.component.css']
})
export class AddEquiposAdmComponent implements OnInit {
  listteams: TeamRESP[] = [];
  totalteams: number = 0;
  listResults: Results[] = [];
  listResults1: Results[] = [];
  totalResults: number = 0;
  datoUsuario=[];
  teamsForm: FormGroup;
  titulo = 'Agregar Equipo';
  _id: string | null;
  loading = true;
  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,   
    private authService: AuthService,  
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute ) {
      this.teamsForm = this.fb.group({ 

        nombre: ['', Validators.required],
        
        supervisor: ['', Validators.required], 
        nivel: ['', Validators.required], 
        guardias: ['', Validators.required],       
       
       
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
      }

  ngOnInit(): void {
    
    console.log(this.teamsForm)
    this.obtenerSupervisores()
    this.geteditarTeams()
    this.obtenerGuardias()
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
  }
  obtenerTeams() {
    this.usuarioService.getTeams().subscribe(data => {
      this.totalteams = data.total;
      this.listteams = data.teams;
    }, error => {
      console.log(error);
    })
  }
  addTeams(){
    console.log(this.teamsForm)
    console.log(this.teamsForm.get('turnos')?.value);

    const TEAMS : teams = {
      nombre: this.teamsForm.get('nombre')?.value,
      
      usuario: this.teamsForm.get('usuario')?.value,
      nivel: this.teamsForm.get('nivel')?.value,
      guardias: this.teamsForm.get('guardias')?.value,
      supervisor: this.teamsForm.get('supervisor')?.value
    }
    if (this._id !== null){
      this.usuarioService.editarTeams(this._id, TEAMS ).subscribe(data =>{})
      this.toastr.info('El Equipo fue actualizado con exito!', 'Equipo actualizado');
      this.router.navigate(['/usuario/lista_equipo'])  
    
    }else{
      //agregar Turnos
    console.log(TEAMS);  
    this.usuarioService.postTeams(TEAMS).subscribe( data =>{
    this.toastr.success('El Equipo fue registrado con exito!', 'Equipo registrado');
    this.router.navigate(['/usuario/lista_equipo'])  
    }, error => {
    console.log(error);
    this.teamsForm.reset();
    })
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
geteditarTeams(){
  if(this._id !== null) {
    this.titulo = 'Editar Equipo';
    this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
      console.log(data);
      this.teamsForm.patchValue({
        nombre : data.team.nombre,
      
        nivel: data.team.nivel,
        supervisor: data.team.supervisor.nombre,
        guardias: data.team.guardias.nombre,
        
        
      })
      console.log(data);
    })
  }
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

