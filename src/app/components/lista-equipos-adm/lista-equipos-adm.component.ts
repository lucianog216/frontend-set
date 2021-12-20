import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {RESTListarUsuario2, TeamRESP, teamguard,  } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-lista-equipos-adm',
  templateUrl: './lista-equipos-adm.component.html',
  styleUrls: ['./lista-equipos-adm.component.css'],
  providers:[UsuarioService]
})
export class ListaEquiposAdmComponent implements OnInit {
  listteams: TeamRESP[] = [];
  teamsForm: FormGroup;
  totalteams: number = 0;
  datoUsuario=[];
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
      console.log(datoNombre);
      
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

    this.obtenerTeams(); 
    this.usuarioService.getTeams().subscribe(data => {
       this.listteams = data.teams;

/*        var listteams2 = data.teams.guardias.nombre
       if(listteams2 == null){
        this.guardias=[];

      console.log("guardias",this.guardias);
       
      } */
       this.dtTrigger.next();
      });
      
  }
  obtenerTeams() {
    this.usuarioService.getTeams().subscribe(data => {
      this.totalteams = data.total;
      this.listteams = data.teams;
     

      var listteams2= data.teams[0].guardias
      if(listteams2 == null){
        
      }
      
    }, error => {
      console.log(error);
    })
  }
  Delete_guard_Teams(_id: string ){
    
  
    const guardia : teamguard = {
      guardia: this.teamsForm.get('guardia')?.value,
      nombre: this.teamsForm.get('nombre')?.value,
      guardias: this.teamsForm.get('guardias')?.value,
      apellido: this.teamsForm.get('apellido')?.value,
      correo: this.teamsForm.get('correo')?.value,
      ciudad: this.teamsForm.get('ciudad')?.value,
    }
    if (this._id !== null){
      this.usuarioService.deleteGuardia_teams(this._id, guardia ).subscribe(data =>{
        console.log(data);
        
      })
      this.toastr.info('El Equipo fue actualizado con exito!', 'Equipo actualizado');
      this.router.navigate(['/usuario/lista_equipo'])  
    
  }
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
    geteditarTeams(){
      if(this._id !== null) {
        
        this.usuarioService.obtenerTeams(this._id).subscribe(data =>{
        
          this.teamsForm.patchValue({
            nombre : data.nombre,
        
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

