import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';



import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-guardia-guardia-descripcion',
  templateUrl: './guardia-guardia-descripcion.component.html',
  styleUrls: ['./guardia-guardia-descripcion.component.css']
})
export class GuardiaGuardiaDescripcionComponent implements OnInit {

  usuarioForm: FormGroup;
  uid: string | null;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
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
      ingreso: ['', Validators.required],  
    }),
     this.uid = this.aRouter.snapshot.paramMap.get('uid'); 
    }


  ngOnInit(): void{
    this.geteditarUsuario();

  }
  geteditarUsuario(){
    if(this.uid !== null) {
      this.usuarioService.obtenerUsuario(this.uid).subscribe(data =>{
        console.log(data.region.nombre);
        this.usuarioForm.patchValue({
          nombre : data.nombre,    
          apellido: data.apellido,
          celular: data.celular,
          password: '', 
          correo: data.correo, 
          rol: data.rol,
          region: data.region.nombre,
          ciudad: data.ciudad,
          rut: data.rut,
          ingreso: data.ingreso,
          uid: data.uid
          
        })
      })
    }
}  
}
