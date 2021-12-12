import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'src/app/models/Usuario';
@Component({
  selector: 'app-guardia-info-personal',
  templateUrl: './guardia-info-personal.component.html',
  styleUrls: ['./guardia-info-personal.component.css']
})
export class GuardiaInfoPersonalComponent implements OnInit {
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
  teamuser =[];
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
    var datoteam = localStorage.getItem('team');
    if(datoteam == null){
      this.teamuser =[];
    }else{
      this.teamuser = JSON.parse(datoteam)
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
