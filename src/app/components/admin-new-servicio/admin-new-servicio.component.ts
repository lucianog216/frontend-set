import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turnos } from 'src/app/models/Turnos';
import { UsuarioService } from 'src/app/services/usuario.service';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { servicio } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-new-servicio',
  templateUrl: './admin-new-servicio.component.html',
  styleUrls: ['./admin-new-servicio.component.css']
})
export class AdminNewServicioComponent implements OnInit {
  datoUsuario=[];
  listturnos: Turnos[] = [];
  totalturnos: number = 0;
  ServicioForm: FormGroup;
  _id: string | null;
  constructor( private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,private aRouter: ActivatedRoute,
    private toastr: ToastrService,) {
      this.ServicioForm = this.fb.group({ 
        titulo: ['', Validators.required], 
        descripcion: ['', Validators.required], 
        turno: ['', Validators.required], 
        
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
      }

  ngOnInit(): void {


    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

    this.obtenerTurnos(); 
    

    this.usuarioService.getTurnos().subscribe(data => {
       this.listturnos = data.turnos;
       
      });
  }

  obtenerTurnos() {
    this.usuarioService.getTurnos().subscribe(data => {
      this.totalturnos = data.totalturnos;
      this.listturnos = data.turnos;
      console.log(this.listturnos)
    }, error => {
      console.log(error);
    })
  }
  addServ(){
    console.log(this.ServicioForm)
    console.log(this.ServicioForm.get('servicio')?.value);

    const SERVICIO : servicio = {
      
      titulo: this.ServicioForm.get('titulo')?.value,
      descripcion: this.ServicioForm.get('descripcion')?.value,
      turno: this.ServicioForm.get('turno')?.value
      
    }
    {
      this.usuarioService.postServicio( SERVICIO ).subscribe(data =>{
        console.log(data);
        
      })
      this.toastr.info('El Servicio fue creado con exito!', 'Servicio actualizado');
      this.router.navigate(['/usuario/lista_equipo'])  
    
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
