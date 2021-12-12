import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RESTListarServi, Servicio } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-admin-list-servicio',
  templateUrl: './admin-list-servicio.component.html',
  styleUrls: ['./admin-list-servicio.component.css'],
  providers:[UsuarioService]
})
export class AdminListServicioComponent implements OnInit {
  datoUsuario =[];
  listServ: Servicio[] = [];
  totalServ: number = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor( private router: Router,
    private usuarioService: UsuarioService,) { }

  ngOnInit(): void {
    


    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

}

 /* obtenerSrev() {
    this.usuarioService.getServicio().subscribe(data => {
      this.totalServ = data.total;
      this.listServ = data.servicios;
      console.log(data)
    }, error => {
      console.log(error);
    })
  }*/
  
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
