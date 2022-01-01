import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RESTListarServi, Servicio } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-guardia-add-servicio',
  templateUrl: './guardia-add-servicio.component.html',
  styleUrls: ['./guardia-add-servicio.component.css']
})
export class GuardiaAddServicioComponent implements OnInit {
  moment: any = moment;
  id: string | null;
  usuarioForm: FormGroup;
  datoUsuario =[];
  listteams2 =[];
  team=[]
  turno=[]
  usuario=[]
  dia=[]
  Inicio=[]
  fin=[]
  decripcion=[]
  listServ: Servicio[] = [];
  totalServ: number = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private fb: FormBuilder, 
     private router: Router,
    private aRouter: ActivatedRoute,
    private usuarioService: UsuarioService,){
      this.usuarioForm = this.fb.group({ 
        // nombre: ['', Validators.required],     
        // apellido: ['', Validators.required], 
        // celular: ['', Validators.required],
        // password: ['', Validators.required], 
        // correo: ['', Validators.required], 
        // rol: ['', Validators.required],
        // rut: ['', Validators.required], 
        // region: ['', Validators.required], 
        // ciudad: ['', Validators.required],
        // direccion: ['', Validators.required],
        
      }),
       this.id = this.aRouter.snapshot.paramMap.get('id'); 
      }

  ngOnInit(): void {
    this.obtenerSrev();
    this.getServicioID()


    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

}

  obtenerSrev() {
    this.usuarioService.getServicio().subscribe(data => {
      this.totalServ = data.total;
      this.listServ = data.servicios;
       this.listteams2= data.servicios;
      console.log(this.listteams2)
    }, error => {
      console.log(error);
    })
  }
  getServicioID(){
    if(this.id !== null) {
      
      this.usuarioService.getServicioID(this.id).subscribe(data =>{
        this.team = data.title
        this.usuario = data.cliente.nombre
        this.dia = data.date
        this.Inicio = data.start
        this.fin = data.end
        this.decripcion = data.descripcion
        this.turno = data.turno.nombre
        this.usuarioForm.patchValue({
          
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
