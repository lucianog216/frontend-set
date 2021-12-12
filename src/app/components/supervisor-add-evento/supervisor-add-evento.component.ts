import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { UsuarioService } from '../../services/usuario.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
@Component({
  selector: 'app-supervisor-add-evento',
  templateUrl: './supervisor-add-evento.component.html',
  styleUrls: ['./supervisor-add-evento.component.css'],
  providers: [UsuarioService],
})
export class SupervisorAddEventoComponent implements OnInit {

  public event: Event;
  


  constructor(private usuarioService: UsuarioService) { 
    this.event = new Event({});

    this.event.startDate = new Date();
    this.event.endDate = new Date();
  }

  ngOnInit() {

  }

  addEvent(){

    console.log(this.event);

    this.usuarioService.getServicio(this.event)


  }

}
