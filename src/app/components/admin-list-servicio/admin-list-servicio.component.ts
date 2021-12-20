import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RESTListarServi, Servicio } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-admin-list-servicio',
  templateUrl: './admin-list-servicio.component.html',
  styleUrls: ['./admin-list-servicio.component.css'],
  providers:[UsuarioService]
})
export class AdminListServicioComponent implements OnInit {
  moment: any = moment;
  
  datoUsuario =[];
  listteams2 =[];
  listServ: Servicio[] = [];
  totalServ: number = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor( private router: Router,
    private usuarioService: UsuarioService,) { }

  ngOnInit(): void {
    this.obtenerSrev();


    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

}

  obtenerSrev() {
    this.usuarioService.getServicio().subscribe(data => {
      this.totalServ = data.total;
      this.listServ = data.servicios;
       this.listteams2= data.servicios;
      console.log(this.listteams2)
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
