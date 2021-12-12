import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { turnos } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-add-turnos-adm',
  templateUrl: './add-turnos-adm.component.html',
  styleUrls: ['./add-turnos-adm.component.css']
})
export class AddTurnosAdmComponent implements OnInit {
  listturnos: turnos[] = [];
  totalturnos: number = 0;
  datoUsuario=[];
  turnoForm: FormGroup;
  titulo = 'Agregar Turno';
  _id: string | null;

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,   
    private authService: AuthService,  
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute ) {
      this.turnoForm = this.fb.group({ 
        nombre: ['', Validators.required],     
        usuarios: ['', Validators.required],
        ingreso: ['', Validators.required],
        salida: ['', Validators.required],
        horas: ['', Validators.required],
        colacion: ['', Validators.required],
         
      }),
       this._id = this.aRouter.snapshot.paramMap.get('_id'); 
      }

  ngOnInit(): void {
    this.geteditarTurno()
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
  }
  obtenerTurnos() {
    this.usuarioService.getTurnos().subscribe(data => {
      this.totalturnos = data.totalturnos;
      this.listturnos = data.turnos;
      console.log(this.listturnos)
    }, error => {
      console.log(error);
    })
  }
  addTurnos(){
    console.log(this.turnoForm)
    console.log(this.turnoForm.get('turnos')?.value);

    const TURNOS : turnos = {
      nombre: this.turnoForm.get('nombre')?.value,
      usuario: this.turnoForm.get('usuario')?.value,
      ingreso: this.turnoForm.get('ingreso')?.value,
      salida: this.turnoForm.get('salida')?.value,
      horas: this.turnoForm.get('horas')?.value,
      colacion: this.turnoForm.get('colacion')?.value,
    }
    if (this._id !== null){
      this.usuarioService.editarTurnos(this._id, TURNOS ).subscribe(data =>{})
      this.toastr.info('El Turno fue actualizado con exito!', 'Turno actualizado');
      this.router.navigate(['/usuario/lista_turno'])  
    }else{
      //agregar Turnos
    console.log(TURNOS);  
    this.usuarioService.postTurnos(TURNOS).subscribe( data =>{
    this.toastr.success('El Turno fue registrado con exito!', 'Turno registrado');
    this.router.navigate(['/usuario/lista_turno'])  
    }, error => {
    console.log(error);
    this.turnoForm.reset();
    })
  }
}
//obtener y editar
geteditarTurno(){
  if(this._id !== null) {
    this.titulo = 'Editar Turno';
    this.usuarioService.obtenerTurnos(this._id).subscribe(data =>{
      console.log(data);
      this.turnoForm.patchValue({
        nombre : data.nombre,
        ingreso : data.ingreso,     
        salida : data.salida, 
        horas : data.horas, 
        colacion : data.colacion, 
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
