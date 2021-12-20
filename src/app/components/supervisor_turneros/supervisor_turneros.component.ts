import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turnos } from 'src/app/models/Turnos';
import { UsuarioService } from 'src/app/services/usuario.service';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { Results, turneros } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from 'src/app/models/Clientes';
@Component({
  selector: 'app-supervisor_turneros',
  templateUrl: './supervisor_turneros.component.html',
  styleUrls: ['./supervisor_turneros.component.css']
})
export class Supervisor_turnerosComponent implements OnInit {
  datoUsuario=[];
  listturnos: Turnos[] = [];
  totalturnos: number = 0;
  listResults12: Clientes []=[];
  ServicioForm: FormGroup;
  listResults1: Results[] = [];
  _id: string | null;
  constructor( private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,private aRouter: ActivatedRoute,
    private toastr: ToastrService,) {
      this.ServicioForm = this.fb.group({ 
        guardia: ['', Validators.required], 
        cliente: ['', Validators.required], 
        inicio: ['', Validators.required], 
        final: ['', Validators.required], 
        turno: ['', Validators.required], 
        
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
      }

  ngOnInit(): void {
    this.obtenerTurnos(); 
    this.obtenerGuardias();
    this.obtenerClientes();


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
    console.log(this.ServicioForm)
    console.log(this.ServicioForm.get('turneros')?.value);

    
    const turneros : turneros = {
      
      guardia: this.ServicioForm.get('guardia')?.value,
      inicio: this.ServicioForm.get('inicio')?.value,
      final: this.ServicioForm.get('final')?.value,
      cliente: this.ServicioForm.get('cliente')?.value,
      turno: this.ServicioForm.get('turno')?.value
      
    }
    {
      this.usuarioService.postTurneros( turneros ).subscribe(data =>{
        console.log(data);
        
      })
      this.toastr.info('El Turno fue creado con exito!', 'Turno actualizado');
      this.router.navigate(['/supervisor/CalendarioMañana'])  
    
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
