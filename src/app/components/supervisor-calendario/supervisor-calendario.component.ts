import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {  IEvent } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'src/app/models/Usuario';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';
declare var $: any;

@Component({
  selector: 'app-supervisor-calendario',
  templateUrl: './supervisor-calendario.component.html',
  styleUrls: ['./supervisor-calendario.component.css']
})
export class SupervisorCalendarioComponent implements OnInit {

  public events: any;
  public options: any;
  public options2: any;
  public fechaEventosList: Date;
  title = 'easyfullcalendar';
  posts: any;

  totalUsuario: number = 0;
  totalResults: number = 0;
  totalclientes: number = 0;
  totalResultsSuper: number = 0;
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
  usuarioForm: FormGroup;
  uid: string | null;
  
  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService ) { 
      this.usuarioForm = this.fb.group({ 
        nombre: [ '', Validators.required], 
        apellido: ['', Validators.required], 
        password:['', Validators.required], 
        celular: ['', Validators.required], 
        correo: ['', Validators.required], 
        
      }),
        this.uid = localStorage.getItem('uid')

       
    
        this.options = {
          plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
          defaultDate: new Date(),
          locale: esLocale,
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          editable: false
        }

       /* eventRender: (e) =>  {
          var tooltip = new Tooltip(e.el, {
            title: "<h6>"+e.event.title +"</h6>"+e.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body',
            html: true
          });
  
        },
        editable: false
      };*/
    
        this.options2 = {
          plugins: [listPlugin, dayGridPlugin],
          locale: esLocale,
          defaultDate: new Date(),
          defaultView: 'list',
          header: {
            left: 'prev,next',
            center: 'Proximo evento',
            right: ''
          },
          editable: false
        };
    }

   


  ngOnInit(): void{
    this.obtenerGuardias()
    this.obtenerClientes()
    this.obtenerUsuario()
    this.obtenerSupervisores()
    
    

   /* this.events = [
      {
        "title": "evento 1",
        "start": "2021-12-10T14:23:00",
        "end": "2021-12-10T16:23:00",
        "description": "Evento1"
      },
      {
        "title": "evento 1.2",
        "start": "2021-12-10T17:23:00",
        "end": "2021-12-10T19:23:00",
        "description": "Evento1.2"
      },
      {
        "title": "Navidad",
        "start": "2021-12-25T16:23:00",
        "description": "Evento1"
      },
      {
        title: "evento 2",
        start: new Date(new Date().getTime()+ 86400000),
        description: "Evento 2"
      },
      {
        title: "evento 3",
        start: new Date(new Date().getTime()+ (86400000 * 2) ), 
        end: new Date(new Date().getTime()+ (86400000 * 3) ), 
        description: "Evento 3"
      }


    ]*/




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
    

    if (this.uid !== null)
    this.usuarioService.obtenerimg(this.uid).subscribe(res=>{
     localStorage.setItem('img2', res); 
     console.log(res);
     
    })
    
   
  }
 
  
  addUsuario(){
   
    

    const USUARIO : usuario = {
     
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      celular: this.usuarioForm.get('celular')?.value,
      password: this.usuarioForm.get('password')?.value,
      correo: this.usuarioForm.get('correo')?.value,
      rol: this.usuarioForm.get('rol')?.value,
      rut: this.usuarioForm.get('rut')?.value,
      region: this.usuarioForm.get('region')?.value,
      ciudad: this.usuarioForm.get('ciudad')?.value,
      direccion: this.usuarioForm.get('direccion')?.value,
      img: this.usuarioForm.get('img')?.value,
      
    }
    if (this.uid !== null)
      this.usuarioService.editarUsuario(this.uid, USUARIO).subscribe(data =>{})
      this.toastr.info('El usuario fue actualizado con exito!', 'Usuario actualizado');
      this.router.navigate(['/usuario'])  
    
  }
  obtenerUsuario() {
    this.usuarioService.getUsuarios().subscribe(data => {
     this.totalUsuario = data.total;
     
    }, error => {
      console.log(error);
    })
  }
  obtenerGuardias() {
    this.usuarioService.getResults().subscribe(data => {
      this.totalResults = data.total;
      
    }, error => {
      console.log(error);
    })
  }
  obtenerSupervisores() {
    this.usuarioService.getResultsSupervisor().subscribe(data => {
     this.totalResultsSuper = data.total;
     
    }, error => {
      console.log(error);
    })
  }
  obtenerClientes() {
    this.usuarioService.getClientes().subscribe(data => {
      this.totalclientes = data.total;
      
    }, error => {
      console.log(error);
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
      this.router.navigate(['login'])
  }

}
