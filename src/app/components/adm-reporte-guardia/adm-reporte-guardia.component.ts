import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'
import 'moment/locale/es';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-adm-reporte-guardia',
  templateUrl: './adm-reporte-guardia.component.html',
  styleUrls: ['./adm-reporte-guardia.component.css']
})
export class AdmReporteGuardiaComponent implements OnInit {
  moment: any = moment;
  date: String;
  datoUsuario =[]
  id: string | null;

  guardianombre = []
  guardiaApellido =[]
  guardiaCorreo = []
  guardiaCiudad = []
  guardiaDireccion = []
  guardiaCelular = []
  cliente = []
  fecha = []
  ingreso = []
  salida = []
  turno = []
  supervisor = []
  equipo = []
  estado : boolean
  horas = []
  observacion = []
  totalhoras = []
  idguardia:string
  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private aRouter: ActivatedRoute,) {
      this.id = this.aRouter.snapshot.paramMap.get('id'); 
    }
  

  ngOnInit() {
  
    this.date = moment(new Date()).format('DD-MM-YYYY');
    console.log(moment(new Date()).format('YYYY'));

    this.obtenerTurno()
    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
    

  }

  obtenerTurno(){
    
      if(this.id !== null) {
        
        this.usuarioService.getTurneroid(this.id).subscribe(data =>{
          
    
          this.guardianombre = data.guardia.nombre
          this.guardiaApellido = data.guardia.apellido
          this.guardiaCorreo = data.guardia.correo
          this.guardiaCiudad = data.guardia.ciudad
          this.guardiaDireccion= data.guardia.direccion
          this.guardiaCelular = data.guardia.celular

          this.cliente = data.cliente.nombre
          this.fecha = data.inicio
          this.ingreso = data.turno.ingreso
          this.salida = data.turno.salida
          this.turno = data.turno.nombre
          this.supervisor = data.usuario.nombre
          this.equipo = data.team.nombre
          this.estado = data.estado
          this.horas = data.turno.horas
          this.totalhoras = data.guardia.totalHoras
          this.idguardia = data.id
          this.observacion = data.observacion
          console.log('gatooo',data )
          console.log('observacion',this.estado )
        })
      }
    
  }
  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(moment(new Date()).format('LL'));
    });
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
