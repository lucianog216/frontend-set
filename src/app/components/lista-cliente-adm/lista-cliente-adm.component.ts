import { Component, OnInit } from '@angular/core';
import { clientes } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Clientes } from 'src/app/models/Clientes';

@Component({
  selector: 'app-lista-cliente-adm',
  templateUrl: './lista-cliente-adm.component.html',
  styleUrls: ['./lista-cliente-adm.component.css'],
  providers:[UsuarioService]
})
export class ListaClienteAdmComponent implements OnInit {
  listclientes: Clientes[] = [];
  totalclientes: number = 0;
  datoUsuario=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  loading = true;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(){
    this.loading = true;
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

    
    this.obtenerClientes(); 

    this.usuarioService.getClientes().subscribe(data => {
       this.listclientes = data.clientes;
       this.dtTrigger.next();
      });
      this.loading = false;
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  deleteCliente(_id: string ) {
    Swal.fire({
      title: '¿eliminar cliente?',
      text: "el cliente sera eliminado de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteClientes(_id).subscribe(
        (res) => {
        this.obtenerClientes();
      },
        (err) => console.error(err)
      );
        Swal.fire(
          'Eliminado!',
          'Cliente Eliminado.',
          'success'
        )
      }
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
