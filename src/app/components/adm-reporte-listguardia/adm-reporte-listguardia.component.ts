import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-adm-reporte-listguardia',
  templateUrl: './adm-reporte-listguardia.component.html',
  styleUrls: ['./adm-reporte-listguardia.component.css']
})
export class AdmReporteListguardiaComponent implements OnInit {
  moment: any = moment;
  public page: number;
  listteams3 =[]
  datoUsuario =[]
  teamsForm: FormGroup;
  _id: string | null;

  constructor( private router: Router, 
  private usuarioService: UsuarioService,
  private fb: FormBuilder,
  private aRouter: ActivatedRoute) {
    this.teamsForm = this.fb.group({ 
       
    }),
     this._id = this.aRouter.snapshot.paramMap.get('_id'); 
    }

  ngOnInit() {
    this.obtenerGuardias()

    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
  }

  obtenerGuardias(): void{
    if(this._id !== null) {
      this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
        this.listteams3 = data.team.guardias;
        console.log('guardiaaas', data)
        this.teamsForm.patchValue({
          nombre : data.team.nombre,
          guardias:{
             nombre : data.team.guardias.nombre,
             _id : data.team.guardias._id,
             apellido : data.team.guardias.apellido,
          }
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
      localStorage.removeItem('uid');
      localStorage.removeItem('region');
      localStorage.removeItem('direccion');
      localStorage.removeItem('ciudad');
      localStorage.removeItem('team');
      this.router.navigate(['login'])
  }

}
