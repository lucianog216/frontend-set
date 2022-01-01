import {  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'src/app/models/Usuario';
import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef,} from '@angular/core';
import { startOfDay, endOfDay,subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
@Component({
  selector: 'app-adm-reporte-equipo-calendarioTurno',
  templateUrl: './adm-reporte-equipo-calendarioTurno.component.html',
  styleUrls: ['./adm-reporte-equipo-calendarioTurno.component.css']
})
export class AdmReporteEquipoCalendarioTurnoComponent implements OnInit {
  _id: string | null;
  locale: string = 'es';
  datoUsuario =[]
  data3=[];
  turno=[]
  uid: string | null;
  datoUid : string;
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  
  actions: CalendarEventAction[] = [];
  
  refresh = new Subject<void>();
  

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, 
  private usuarioService: UsuarioService,
  private router: Router, private aRouter: ActivatedRoute) {
    this._id = this.aRouter.snapshot.paramMap.get('_id'); 
  }
  ngOnInit(): void{

    
    this.getTurno()


    var datoNombre = localStorage.getItem('nombre');
    if(datoNombre == null){
      this.datoUsuario =[];
    }else{
      this.datoUsuario = JSON.parse(datoNombre)
    }
  
  }
  events: CalendarEvent[] 
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    
    this.usuarioService.getGeneralTurnos(this._id).subscribe(data => {
      this.data3 = data.results[0];
      console.log('gatoooo',this.data3);
     
     for(let i=0;i<this.data3.length;i++){
      console.log(this.data3);
      this.turno.push(   
        {
          id: this.data3[i].id,
        },
        this.router.navigate(['usuario/reporte/gurdiaTurno', this.data3[i].id,]),
      );
    }
  }, error => {
    console.log(error);
  })
  }

  getTurno(): void{
    if(this._id !== null) {
      console.log('hola',this._id);
    this.usuarioService.getGeneralTurnos(this._id).subscribe(data => {
      this.data3 = data.results[0];
      console.log('turnos',this.data3);
     this.events=[]
     for(let i=0;i<this.data3.length;i++){
      this.events.push(   
        {
          title : this.data3[i].cliente.nombre,
        start: new Date( this.data3[i].inicio),
        end: new Date( this.data3[i].inicio),
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
        }
      );
       
    }
  }, error => {
    console.log(error);
  })
    }
  }

  setView(view: CalendarView) {
    this.view = view;
    

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
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
















/*this.usuarioService.getTurnerosid(this.datoUid).subscribe(data => {
  this.data3 = data.results[0];
 
  this.events=[];

  for(let i=0;i<this.data3.length;i++){
    
    this.events.push(   
   
      {

        title : this.data3[i].guardia.nombre,
        start: this.data3[i].inicio,
        end: this.data3[i].final,
        description: this.data3[i].descripcion,
      }
    );
  }

}, error => {
console.log(error);
})
}*/