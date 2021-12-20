import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'src/app/models/Usuario';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-guardia-calendario',
  templateUrl: './guardia-calendario.component.html',
  styleUrls: ['./guardia-calendario.component.css']
})
export class GuardiaCalendarioComponent implements OnInit {

  public events: any[];
  public options: any;


  


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
  data2=[]
  data3=[]
  imgUser=[];
  img=[];
  direccionUser=[];
  regionUser=[];
  ciudaduser =[];
  usuarioForm: FormGroup;
  uid: string | null;
  datoUid : string
  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
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
    }

  ngOnInit(): void{
    this.obtenerGuardias()
    this.obtenerClientes()
    this.obtenerUsuario()
    this.obtenerSupervisores()
    
    this.obtenerTurnero1();


    

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      timeZone: 'UTC',
      
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,list',
        color: '#ff9f89',
        
        display: 'background',
      },
      eventColor: '#378006',
     
      dayMaxEvents: true, // allow "more" link when too many events
      editable: true,
      selectable: true,
     
    }
   


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
    }var datoid = localStorage.getItem('uid');
    if(datoid == null){
     
    }else{
      this.datoUid = datoid
      
    }
    
   
  }
  obtenerTurnero1() {

  var datoid = localStorage.getItem('uid');
  if(datoid == null){
   
  }else{
    this.datoUid = datoid
    console.log(this.datoUid)
  }
    this.usuarioService.getTurnerosid(this.datoUid).subscribe(data => {
      this.data3 = data.results[0];
     
      this.events=[];

      for(let i=0;i<this.data3.length;i++){
        
        this.events.push(   
       
          {

            title : this.data3[i].guardia.nombre,
            start: this.data3[i].inicio,
            end: this.data3[i].final,
            description: this.data3[i].descripcion,
          }
        );
      
         
      }

  }, error => {
    console.log(error);
  })
}
  



 /* obtenerTurnero() {
    this.usuarioService.getTurneros().subscribe(data => {
      this.data2 = data.turnos;
      this.events=[];
      console.log(this.data2);
      for(let i=0;i<this.data2.length;i++){
        this.events.push(   
          {

            title : this.data2[i].cliente.nombre,
            
            start: this.data2[i].inicio,
            end: this.data2[i].final,
            description: this.data2[i].descripcion,
          }
        );
      
         
      }
    
      
      
      // this.events =  [
       
      //   {
      //     title : data.titulo,
      //     start: data.inicio,
      //     end: "2021-12-10T16:23:00",
      //     descripcion: "Evento1"
      //   },
        
      //  ]



    }, error => {
      console.log(error);
    })
  }*/

  
  
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
      localStorage.removeItem('region');
      localStorage.removeItem('direccion');
      localStorage.removeItem('ciudad');
      localStorage.removeItem('team');
      this.router.navigate(['login'])
  }

}
