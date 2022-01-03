import {  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef,} from '@angular/core';
import { startOfDay, endOfDay,subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
declare var $: any;




@Component({
  selector: 'app-supervisor-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './supervisor-calendario.component.html',
  styleUrls: ['./supervisor-calendario.component.css']
})
export class SupervisorCalendarioComponent  {
  
  locale: string = 'es';
  datoUsuario =[]
  data3=[]
  turno=[]
  turno4: any
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
  
  actions: CalendarEventAction[
    
  ] = [
    
    
  ];
  

  refresh = new Subject<void>();
  

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, 
  private usuarioService: UsuarioService,
  private router: Router) {}
  ngOnInit(): void{
    

    this.usuarioService.getServicio().subscribe(data => {
      this.data3 = data.servicios;
      
     this.events=[
     ]

     for(let i=0;i<this.data3.length;i++){
      console.log(this.data3[i].title);
      
      this.events.push(   
        {
          title: this.data3[i].descripcion,
          
          start: new Date( this.data3[i].date),
          end: new Date( this.data3[i].date),
          id: this.data3[i].id,
          color: colors.yellow,
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
    this.turno4 = event.id
    console.log('gatoooo',this.modalData)
  
   
    if(this.turno4 !== null) {
    this.usuarioService.getServicioID(this.turno4).subscribe(data => {
      this.data3 = data.id;
      console.log(this.data3);
      this.router.navigate(['supervisor/servicio_add', this.data3])
     
     for(let i=0;i<this.data3.length;i++){
      console.log(this.data3);
      this.turno.push(   
        {
          id: this.data3[i].id,
        },
        
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
