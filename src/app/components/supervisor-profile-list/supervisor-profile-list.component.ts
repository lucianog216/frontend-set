import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router'
import { Usuario } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-supervisor-profile-list',
  templateUrl: './supervisor-profile-list.component.html',
  styleUrls: ['./supervisor-profile-list.component.css']
})
export class SupervisorProfileListComponent implements OnInit, OnDestroy {
  listUsuario: Usuario[] = [];
  totalUsuario: number = 0;
  dtOptions: DataTables.Settings = {};
  datoUsuario=[];

  dtTrigger = new Subject();

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void{
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
    this.obtenerUsuario();
    this.usuarioService.getUsuarios().subscribe(data => {
      this.totalUsuario = data.total;
       this.listUsuario = data.usuarios;
       this.dtTrigger.next();
      });
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  obtenerUsuario() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.totalUsuario = data.total;
     this.listUsuario = data.usuarios;
     
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
