import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Turnos } from 'src/app/models/Turnos';
import * as moment from 'moment';
import 'moment/locale/es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guardia-list-turno',
  templateUrl: './guardia-list-turno.component.html',
  styleUrls: ['./guardia-list-turno.component.css']
})
export class GuardiaListTurnoComponent implements OnInit {
  id: string | null;
  moment: any = moment;
  listturnos: Turnos[] = [];
  totalturnos: number = 0;
  datoUsuario=[];
  usuarioForm: FormGroup;
  datoUid : string
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  data2 =[]
  data3 =[]

  guardianombre = []
  guardiaApellido =[]
  cliente = []
  fecha = []
  ingreso = []
  turno = []
  supervisor = []
  idguardia:string

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService, 
    private router: Router,private aRouter: ActivatedRoute,) {
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

  ngOnInit(){
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    };
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }


    var datoid = localStorage.getItem('uid');
    if(datoid == null){
     
    }else{
      this.datoUid = datoid
      
    }

    this.getServicioID()
    this.obtenerTurnos(); 
    
    this.obtenerTurnero1();
    

    this.usuarioService.getTurnos().subscribe(data => {
       this.listturnos = data.turnos;
       this.dtTrigger.next();
      });
      
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  deleteTurnos(_id: string ) {
    Swal.fire({
      title: '¿eliminar Turno?',
      text: "el Turno sera eliminado de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteTurnos(_id).subscribe(
        (res) => {
        this.obtenerTurnos();
      },
        (err) => console.error(err)
      );
        Swal.fire(
          'Eliminado!',
          'Turno Eliminado.',
          'success'
        )
      }
    })      
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
      console.log(this.data3)

  }, error => {
    console.log(error);
  })
}

getServicioID(){
  if(this.id !== null) {
    
    this.usuarioService.getTurneroid(this.id).subscribe(data =>{
      

      this.guardianombre = data.guardia.nombre
      this.guardiaApellido = data.guardia.apellido
      this.cliente = data.cliente.nombre
      this.fecha = data.inicio
      this.ingreso = data.turno.ingreso
      this.turno = data.turno.nombre
      this.supervisor = data.usuario.nombre
      this.idguardia = data.id
      console.log('gatooo', this.idguardia )
    })
  }
}


  
    obtenerTurnos() {
    this.usuarioService.getTurneros().subscribe(data => {
      this.totalturnos = data.totalturnos;
      
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

