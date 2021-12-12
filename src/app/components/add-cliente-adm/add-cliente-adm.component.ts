import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { clientes, Regione, regionesRESP } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-add-cliente-adm',
  templateUrl: './add-cliente-adm.component.html',
  styleUrls: ['./add-cliente-adm.component.css'],
  providers: [UsuarioService]

})
export class AddClienteAdmComponent implements OnInit {
  
  listclientes: clientes[] = [];
  listregiones: Regione[] = [];
  listregiones2: Regione[] = [];

  totalclientes: number = 0;
  datoUsuario=[];
  clienteForm: FormGroup;
  titulo = 'Agregar cliente';
  _id: string | null;

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,   
    private authService: AuthService,  
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute ) {
      this.clienteForm = this.fb.group({ 
        nombre: ['', Validators.required],     
        rut: ['', Validators.required], 
        celular: ['', Validators.required], 
        correo: ['', Validators.required], 
        region: ['', Validators.required], 
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required], 
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
       
      }

  ngOnInit(): void {
  
    this.obtenerRegion()
    this.geteditarCliente()
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
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
  onSelect(ciudades: any): void{
  this.listregiones = this.listregiones.filter(item => item.id = ciudades);
  }

  obtenerRegion() {
    this.usuarioService.getRegiones().subscribe(data => {
      this.listregiones = data;
     
    }, error => {
      console.log(error);
    })
  }

  
  obtenerClientes() {
    this.usuarioService.getClientes().subscribe(data => {
      this.totalclientes = data.totalclientes;
      this.listclientes = data.clientes;
      console.log(this.listclientes)
    }, error => {
      console.log(error);
    })
  }


  addCliente(){
    console.log(this.clienteForm)
    console.log(this.clienteForm.get('clientes')?.value);
    const CLIENTES : clientes = {
      nombre: this.clienteForm.get('nombre')?.value,
      rut: this.clienteForm.get('rut')?.value,
      celular: this.clienteForm.get('celular')?.value,
      correo: this.clienteForm.get('correo')?.value,
      usuario: this.clienteForm.get('')?.value,
      region: this.clienteForm.get('region')?.value,
      ciudad: this.clienteForm.get('ciudad')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
    }
    if (this._id !== null){
      this.usuarioService.editarCliente(this._id, CLIENTES ).subscribe(data =>{})
      this.toastr.info('El Cliente fue actualizado con exito!', 'Cliente actualizado');
      this.router.navigate(['/usuario/lista_cliente'])  
    }else{
      //agregar Cliente
    console.log(CLIENTES);  
    this.usuarioService.postCliente(CLIENTES).subscribe( data =>{
    this.toastr.success('El Cliente fue registrado con exito!', 'Cliente registrado');
    this.router.navigate(['/usuario/lista_cliente'])  
    }, error => {
    console.log(error);
    this.clienteForm.reset();
    })
  }
}
//obtener y editar
geteditarCliente(){
  if(this._id !== null) {
    this.titulo = 'Editar Cliente';
    this.usuarioService.obtenerClientes(this._id).subscribe(data =>{
      console.log(data);
      this.clienteForm.patchValue({
        nombre : data.nombre,    
        rut: data.rut,
        celular: data.celular,
        correo: data.correo, 
        region: data.region,
        ciudad: data.ciudad,
        direccion: data.direccion
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
    localStorage.removeItem('uid')
    this.router.navigate(['login'])
  }

}
