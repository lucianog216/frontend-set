import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-adm-equipo-reportes',
  templateUrl: './adm-equipo-reportes.component.html',
  styleUrls: ['./adm-equipo-reportes.component.css']
})
export class AdmEquipoReportesComponent implements OnInit {
  view: [number,number] = [700, 400];
  view2: [number, number] = [700, 400];
  view3: [number, number] = [700, 400];
  datoUsuario =[]


  // options1
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Reporte General';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


   // options2
   gradient2: boolean = true;
   showLegend2: boolean = true;
   showLabels2: boolean = true;
   isDoughnut2: boolean = false;
   legendPosition2: string = 'below';
 
   colorScheme2 = {
     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
   };

   // options3
  showXAxis3: boolean = true;
  showYAxis3: boolean = true;
  gradient3: boolean = false;
  showLegend3: boolean = true;
  showXAxisLabel3: boolean = true;
  yAxisLabel3: string = 'Country';
  showYAxisLabel3: boolean = true;
  xAxisLabel3: string = 'Population';

  colorScheme3 = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private router: Router,
    private usuarioService: UsuarioService,) { }
  single = [];
  single2 = [];
  single3 = [];

  data3=[]
  ngOnInit() {

    this.obtenerUsuario()
    this.obtenerClientes()
    this.obtenerTurnos()

    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
  }



  obtenerUsuario() {
    
    this.usuarioService.getrptGuardiaXteam().subscribe(data => {
      this.data3 = data;
      
     this.single=[]

     for(let i=0;i<this.data3.length;i++){
       
      this.single.push(   
        {
          name : this.data3[i].teams.nombre,
          value :this.data3[i].total,
        
      },
     
      );
       
    }
  }, error => {
    console.log(error);
  })
    
  }
  obtenerClientes() {
   

    this.single2.push({

      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    })
    
  }


  obtenerTurnos() {

    this.single3.push({

      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    })

  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
