import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamRESP } from 'src/app/interfaces/interfaces';
import{FormBuilder, FormGroup, Validators} from '@angular/forms'
import { teams, Results, teamguard } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service'
import { Subject } from 'rxjs';
import { Turnos } from 'src/app/models/Turnos';
@Component({
  selector: 'app-usuario-guardia-list',
  templateUrl: './usuario-guardia-list.component.html',
  styleUrls: ['./usuario-guardia-list.component.css'],
  providers:[UsuarioService]
})
export class UsuarioGuardiaListComponent implements  OnInit {
  listteams: TeamRESP[] = [];
  totalteams: number = 0;
  listturnos: Turnos[] = [];
  listResults: Results[] = [];
  listResults1: Results[] = [];
  totalResults: number = 0;
  listteams2= [];
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
      this.router.navigate(['/usuario/lista_equipo'])  
    
  }else{
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
geteditarTeams(){
  if(this._id !== null) {
    this.titulo = 'Editar Equipo';
    this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
      this.listteams2 = data;
      this.teamsForm.patchValue({
      
      })
      
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
    localStorage.removeItem('uid')
    this.router.navigate(['login'])
  }

}


