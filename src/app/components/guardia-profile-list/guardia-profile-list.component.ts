import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario, observacion } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import{ FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-guardia-profile-list',
  templateUrl: './guardia-profile-list.component.html',
  styleUrls: ['./guardia-profile-list.component.css']
})
export class GuardiaProfileListComponent implements OnInit, OnDestroy {
  moment: any = moment;

  listUsuario: Usuario[] = [];
  totalUsuario: number = 0;
  dtOptions: DataTables.Settings = {};
  datoUsuario=[];
  
  dtTrigger = new Subject();
  id: string | null;
  uid: string | null;
  _id: string | null;
  totalteams=[]
  listteams=[]
  listteams2=[]
  teamid=[]
  teamsForm: FormGroup;
  teamuser : string;
  data5=[]
  //guardia datos
  nomguardia=[]
  apellidoguardia =[]
  clienteguardia=[]
  supervisorguardia= []
  turnoguardia=[]
  ingresoturno=[]
  equipoguardia=[]
  correoguardia=[]
  celularguardia=[]
  direguardia=[]
  salidaturno=[]
  ingreso=[]
  salida=[]
  total=[]
  fecha =[]
  descripcion=[]
  clienteForm: FormGroup;
  idguardia: string;
  searchValue:string = '';
  constructor(private fb: FormBuilder, 
    private router: Router, private toastr: ToastrService,
  private usuarioService: UsuarioService,
  private aRouter: ActivatedRoute) {
    this.clienteForm = this.fb.group({ 

      observacion: ['', Validators.required],

    });
    this.id = this.aRouter.snapshot.paramMap.get('id'); 
    this.uid = localStorage.getItem('uid')
   }

  ngOnInit(){

    
    this.geteditarTeams();
    this.obtenerTeams1();
    

    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }

    var datoteam = localStorage.getItem ('team');
    if(datoteam == null){
      
    }else{
      this.teamuser = (datoteam)
      
    }

    this.obtenerUsuario();
  }

  geteditarTeams(){
    
    if(this.id !== null) {
      this.usuarioService.getTurneroid(this.id).subscribe(data =>{
        this.idguardia = data.id
        this.nomguardia = data.guardia.nombre;
        this.apellidoguardia = data.guardia.apellido;
        this.correoguardia = data.guardia.correo;
        this.celularguardia = data.guardia.celular;
        this.direguardia = data.guardia.direccion;
        this.clienteguardia = data.cliente.nombre;
        this.supervisorguardia = data.usuario.nombre;
        this.turnoguardia = data.turno.nombre;
        this.ingresoturno = data.turno.ingreso;
        this.salidaturno = data.turno.salida;
        this.equipoguardia = data.team.nombre;
        this.fecha = data.inicio;
        this.descripcion = data.observacion
         console.log('gato',data)
         
      })
    }
    

  }


  obtenerTeams1(): void{
    var datoteam = localStorage.getItem ('team');
    if(datoteam == null){
    }else{
      this.teamuser = JSON.parse (datoteam)
      console.log(this.teamuser)
    }
    this.usuarioService.obtenerTeams(this.teamuser).subscribe(data => {
      this.teamid = data.team.guardias;
      console.log('botaaaaas',this.teamid)
  }, error => {
    console.log(error);
  })
  }
  ingresousuario( ) {

    Swal.fire('Ingreso correcto')
    this.usuarioService.ingresoTurno(this.idguardia).subscribe(data =>{
      this.ingreso = data.inicio 
      console.log('ingreso', data)

    })
  }

  clearSearch() {
    this.searchValue = null;
  }

  ingresarObservacion(){
    if(this.id !== null){
      const observacion : observacion = {

        observacion: this.clienteForm.get('observacion')?.value,
      }
      this.usuarioService.observacion(this.id, observacion ).subscribe(data =>{
        console.log('observacion',data)
      })
      this.toastr.info('La observacion fue ingresada con exito!', 'observacion actualizado');
      window.location.reload();
    }

  }
  
  salidausuario( ) {

    Swal.fire('salida correcta')
    this.usuarioService.salidaTurno(this.idguardia).subscribe(data =>{
      this.router.navigate(['/guardia/calendario']) 

      console.log('salida', data)
      


    })
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
    localStorage.removeItem('region');
    localStorage.removeItem('direccion');
    localStorage.removeItem('ciudad');
    localStorage.removeItem('team');
    this.router.navigate(['login'])
  }

}
