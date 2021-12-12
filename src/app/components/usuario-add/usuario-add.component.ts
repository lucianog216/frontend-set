import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Regione } from 'src/app/interfaces/interfaces';

import { usuario } from 'src/app/models/Usuario';
import {AuthService} from '../../services/auth.service'
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [UsuarioService],
})
export class UsuarioAddComponent implements OnInit {
  usuarioForm: FormGroup;
  listregiones: Regione[] = [];
  listregiones2: Regione[] = [];
  titulo = 'Agregar Usuario';
  cosa='/';
  uid: string | null;
  datoUsuario=[];
  correoUser =[]
  user = {
    correo: '',
    password:'',
    nombre:'',
    rol:''
   
  }

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,   
    private authService: AuthService,  
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute ) {
      this.usuarioForm = this.fb.group({ 
        nombre: ['', Validators.required],     
        apellido: ['', Validators.required], 
        celular: ['', Validators.required],
        password: ['', Validators.required], 
        correo: ['', Validators.required], 
        rol: ['', Validators.required],
        rut: ['', Validators.required], 
        region: ['', Validators.required], 
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required],
        img: ['', Validators.required], 
      }),
       this.uid = this.aRouter.snapshot.paramMap.get('uid'); 
      }

  ngOnInit(): void{
    this.geteditarUsuario();
    var datoNombre = localStorage.getItem('nombre');
    
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
    var datoCorreo = localStorage.getItem('correo');
    if(datoCorreo == null){
      this.correoUser =[];
    }else{
      this.correoUser = JSON.parse(datoCorreo)
    }
    this.usuarioService.getRegiones().subscribe(data => {
      this.listregiones = data.regiones;
      this.listregiones2 = data.regiones.ciudades;
      console.log('yuhuijKshi',this.listregiones2)
      console.log(data)
    }, error => {
      console.log(error);
    })
  }
   addUsuario(){
    console.log(this.usuarioForm)
    console.log(this.usuarioForm.get('usuario')?.value);

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
    if (this.uid !== null){
      this.usuarioService.editarUsuario(this.uid, USUARIO).subscribe(data =>{})
      this.toastr.info('El usuario fue actualizado con exito!', 'Usuario actualizado');
      this.router.navigate(['/usuario'])  
      
    }else{
      
      //agregar Usuario
    console.log(USUARIO);  
    this.usuarioService.postUsuarios(USUARIO).subscribe( data =>{
    this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado');
    this.router.navigate(['/usuario'])  
    }, error => {
    console.log(error);
    this.usuarioForm.reset();
    })
    }
    }
    //obtener y editar
    geteditarUsuario(){
      if(this.uid !== null) {
        this.titulo = 'Editar Usuario';
        this.usuarioService.obtenerUsuario(this.uid).subscribe(data =>{
          console.log(data);
          this.usuarioForm.patchValue({
            nombre : data.nombre,    
            apellido: data.apellido,
            celular: data.celular,
            password: '', 
            correo: data.correo,
            rut: data.rut, 
            rol: data.rol,
            region: data.region,
            ciudad: data.ciudad,
            direccion: data.direccion
          })
        })
      }
    }
    signUp(){
      this.authService.signUp(this.user).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
        }, 
        err => console.log(err)
      )

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

