import { Component, OnInit } from '@angular/core';
import { img, Usuario } from 'src/app/interfaces/interfaces';
import { usuario } from 'src/app/models/Usuario';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioService } from '../../services/usuario.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-usuario-descripcion',
  templateUrl: './usuario-descripcion.component.html',
  styleUrls: ['./usuario-descripcion.component.css'],
  providers: [UsuarioService],
})
export class UsuarioDescripcionComponent implements OnInit {
  archivos : any = []
  usuarioForm: FormGroup;
  uid: string | null;
  img: FormData
  archivo: File
  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
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

    // addUsuario(){
    //   console.log(this.usuarioForm)
    //   console.log(this.usuarioForm.get('usuario')?.value);
  
    //   const IMG : img = {
      
    //   img: this.usuarioForm.get('img')?.value,
        
    //   }
    //   if (this.uid !== null){
    //     this.usuarioService.CargarImagen(this.uid, IMG).subscribe(data =>{})
    //     this.toastr.info('El usuario fue actualizado con exito!', 'Usuario actualizado');
    //     this.router.navigate(['/usuario'])  
        
    //   }
    // }
getimagen(){
  if(this.uid !== null) {
  this.usuarioService.obtenerimg(this.uid).subscribe(
    res=> console.log('dcrftvgybhnuj',res),
    
  
  )}
}

  ngOnInit(): void{
    this.geteditarUsuario();



  }

  caturarFile(event):any{

    const archivoCapturado = event.target.files[0]
    this.archivos.push(archivoCapturado)


  }

  subirfoto():any{
    const formularioFoto = new FormData();
    this.archivos.forEach(archivo =>{
      formularioFoto.append('file', archivo)
      console.log(archivo)
      this.usuarioService.CargarImagen(this.uid, archivo).subscribe(data =>{})
        this.toastr.info('El usuario fue actualizado con exito!', 'Usuario actualizado');
          
    })
    
        


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
          rol: data.rol.rol,
          region: data.region.nombre,
          ciudad: data.ciudad,
          rut: data.rut,
          ingreso: data.ingreso,
          uid: data.uid
          
        })
      })
    }
}  }
