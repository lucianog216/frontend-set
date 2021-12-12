import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-supervisor-usuario-descripcion',
  templateUrl: './supervisor-usuario-descripcion.component.html',
  styleUrls: ['./supervisor-usuario-descripcion.component.css']
})
export class SupervisorUsuarioDescripcionComponent implements OnInit {

  usuarioForm: FormGroup;
  uid: string | null;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private aRouter: ActivatedRoute ) {
    this.usuarioForm = this.fb.group({ 
      nombre: ['', Validators.required],     
      apellido: ['', Validators.required], 
      password: ['', Validators.required], 
      correo: ['', Validators.required], 
      celular: ['', Validators.required],
      rol: ['', Validators.required], 
      google:['', Validators.required], 
      region:['', Validators.required],
      ciudad:['', Validators.required],
      rut:['', Validators.required],
      ingreso:['', Validators.required],
    }),
     this.uid = this.aRouter.snapshot.paramMap.get('uid'); 


     
    }
getimagen(){
  if(this.uid !== null) {
  this.usuarioService.obtenerimg(this.uid).subscribe(
    res=> console.log('dcrftvgybhnuj',res),
    
  
  )}
}

  ngOnInit(): void{
    this.geteditarUsuario();

  }
  geteditarUsuario(){
    if(this.uid !== null) {
      this.usuarioService.obtenerUsuario(this.uid).subscribe(data =>{
        console.log(data);
        this.usuarioForm.patchValue({
          nombre : data.nombre,    
          apellido: data.apellido,
          celular: data.celular,
          password: '', 
          correo: data.correo, 
          rol: data.rol,
          region: data.region,
          ciudad: data.ciudad,
          rut: data.rut,
          ingreso: data.ingreso
          
        })
      })
    }
}  }
