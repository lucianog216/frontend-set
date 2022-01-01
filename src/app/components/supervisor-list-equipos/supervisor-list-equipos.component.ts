import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {RESTListarUsuario2, teamguard,  } from 'src/app/interfaces/interfaces';
import * as moment from 'moment';
@Component({
  selector: 'app-supervisor-list-equipos',
  templateUrl: './supervisor-list-equipos.component.html',
  styleUrls: ['./supervisor-list-equipos.component.css']
})
export class SupervisorListEquiposComponent implements OnInit {
  moment: any = moment;
  
  teamsForm: FormGroup;
  totalteams: number = 0;
  listteams2 =[];
  listteams3 =[];
  datoUsuario=[];
  datouid: string;
  _id: string | null;
  uid: string | null;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private fb: FormBuilder,private toastr: ToastrService,
    private usuarioService: UsuarioService,
     private router: Router,private aRouter: ActivatedRoute) {

    this.teamsForm = this.fb.group({ 
      guardia: ['', Validators.required], 
      
      
    }),
    this._id = this.aRouter.snapshot.paramMap.get('_id');
    this.uid = this.aRouter.snapshot.paramMap.get('uid'); 
   }

  ngOnInit(): void {
    this.obtenerTeams(); 
    this.getTeamsid();
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
      console.log(datoNombre);
      
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

      
  }
  obtenerTeams() {
    var datoUid = localStorage.getItem('uid');
    if(datoUid == null){
    }else{
      this.datouid = (datoUid)
      console.log('gatooooo',this.datouid );
    }
    this.usuarioService.getTeamXsupervisor(this.datouid).subscribe(data => {
       this.listteams2 = data.results[0];
       this.listteams3 = data;
       console.log('gatooooo',this.listteams3 );

     
      });
      
  }
 
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  deleteTeams(_id: string ) {
    Swal.fire({
      title: '¿Eliminar Equipo?',
      text: "el Equipo sera eliminado de forma permanente!",
      icon: 'warning',
      
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteTeams(_id).subscribe(
        (res) => {
        this.obtenerTeams();
        
      },
        (err) => console.error(err)
      );
        Swal.fire(
          'Eliminado!',
          'Equipo Eliminado.',
          'success'
        )
      }
    })      
    }
    deleteTeamsGuar2(_id: string ) {
      Swal.fire({
        title: '¿Eliminar Guardia del Equipo?',
        text: "el Guardia sera eliminado del Equipo forma permanente!",
        icon: 'warning',
        
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        
        if (result.isConfirmed) {
          this.usuarioService.obtenerTeams(_id).subscribe(
          (res) => {
          this.obtenerTeams();
        },
          (err) => console.error(err)
        );
          Swal.fire(
            'Eliminado!',
            'Guardia Eliminado.',
            'success'
          )
        }
      })      
      }
   /* async deleteTeams2(  ) {
      const { value: fruit } = await Swal.fire({
        title: 'Select field validation',
        input: 'select',
        inputOptions: {
          'Fruits': {
            apples: 'Apples',
            bananas: 'Bananas',
            grapes: 'Grapes',
            oranges: 'Oranges'
          },
          'Vegetables': {
            potato: 'Potato',
            broccoli: 'Broccoli',
            carrot: 'Carrot'
          },
          'icecream': 'Ice cream'
        },
        inputPlaceholder: 'Select a fruit',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'oranges') {
              resolve('mal')
            } else {
              resolve('You need to select oranges :)')
            }
          })
        }
      })
      
      if (fruit) {
        Swal.fire(`You selected: ${fruit}`)
      }
      }*/
    getTeamsid(){
      if(this._id !== null) {
        
        this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
        console.log('equipoooooos',data)
          this.teamsForm.patchValue({
            nombre : data.teams.nombre,
        
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

