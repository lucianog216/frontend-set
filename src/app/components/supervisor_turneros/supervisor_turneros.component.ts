import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turnos } from 'src/app/models/Turnos';
import { UsuarioService } from 'src/app/services/usuario.service';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { Results, turneros } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from 'src/app/models/Clientes';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-supervisor_turneros',
  templateUrl: './supervisor_turneros.component.html', 
  styleUrls: ['./supervisor_turneros.component.css']
})
export class Supervisor_turnerosComponent implements OnInit {
  listteams2=[];
  datoUsuario=[];
  listteams3=[];
  listteams4=[];
  listturnos: Turnos[] = [];
  totalturnos: number = 0;
  listResults12: Clientes []=[];
  
  teamsForm: FormGroup;
  listResults1: Results[] = [];
  _id: string | null;
  constructor( private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,private aRouter: ActivatedRoute,
    private toastr: ToastrService) {
      this.teamsForm = this.fb.group({ 
        guardia: ['', Validators.required], 
        cliente: ['', Validators.required], 
        inicio: ['', Validators.required], 
        team: ['', Validators.required],
        turno: ['', Validators.required], 
        
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
      }

  ngOnInit(): void {
    this.geteditarTeams();

    this.obtenerTurnos(); 
    this.obtenerGuardias();
    this.obtenerClientes();
    this.obtenerTeams();
    this.geteditarTeams2();

    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

    
    

    this.usuarioService.getTurnos().subscribe(data => {
       this.listturnos = data.turnos;
       
      });
  }

  obtenerTeams() {
    this.usuarioService.getTeams().subscribe(data => {
      
      this.listteams2 = data.teams;
      
    }, error => {
      console.log(error);
    })
  }

  obtenerTurnos() {
    this.usuarioService.getTurnos().subscribe(data => {
      this.totalturnos = data.totalturnos;
      this.listturnos = data.turnos;
     
    }, error => {
      console.log(error);
    })
  }
  

  obtenerGuardias() {
    this.usuarioService.getResults().subscribe(data => {
     this.listResults1 = data.results;
     console.log('equipoooos',this.listResults1 );
     
    }, error => {
      console.log(error);
    })
  }
  obtenerClientes() {
    this.usuarioService.getClientes().subscribe(data => {
     this.listResults12 = data.clientes;
     
     console.log(this.listResults12)
    }, error => {
      console.log(error);
    })
  }


  addServ(){
    console.log(this.teamsForm)
    console.log(this.teamsForm.get('turneros')?.value);

    
    const turneros : turneros = {
      
      guardia: this.teamsForm.get('guardia')?.value,
      inicio: this.teamsForm.get('inicio')?.value,
      team: this.teamsForm.get('team')?.value,
      cliente: this.teamsForm.get('cliente')?.value,
      turno: this.teamsForm.get('turno')?.value
      
    }
    {
      this.usuarioService.postTurneros( turneros ).subscribe(data =>{
        console.log(data);
        
      })
      this.toastr.info('El Turno fue creado con exito!', 'Turno Creado');
      this.router.navigate(['/supervisor/list_equipos'])  
    
  }
  }
  geteditarTeams2(): void{
    if(this._id !== null) {
      this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
        this.listteams3 = data.team.guardias;
        this.listteams4 = data.team.clientes;
        console.log('gato',this.listteams4)
      })
    }
  }
  /*getClienteXteam(){
    if(this._id !== null) {
      
      this.usuarioService.getTeamXcliente(this._id).subscribe(data =>{
       
        this.listteams4 = data.results[0];
        console.log('gatobotas',this.listteams4)
      })
    }
  }*/
  geteditarTeams(){
    if(this._id !== null) {
    
      this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
        console.log(data);

        this.teamsForm.patchValue({
          
          team: data.team._id,
          
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
      localStorage.removeItem('uid');
      localStorage.removeItem('region');
      localStorage.removeItem('direccion');
      localStorage.removeItem('ciudad');
      localStorage.removeItem('team');
      this.router.navigate(['login'])
  }
}
