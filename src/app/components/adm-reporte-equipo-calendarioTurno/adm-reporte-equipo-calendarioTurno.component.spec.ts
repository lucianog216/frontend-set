/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdmReporteEquipoCalendarioTurnoComponent } from './adm-reporte-equipo-calendarioTurno.component';

describe('AdmReporteEquipoCalendarioTurnoComponent', () => {
  let component: AdmReporteEquipoCalendarioTurnoComponent;
  let fixture: ComponentFixture<AdmReporteEquipoCalendarioTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmReporteEquipoCalendarioTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmReporteEquipoCalendarioTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
