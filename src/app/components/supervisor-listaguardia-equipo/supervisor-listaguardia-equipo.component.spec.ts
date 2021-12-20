/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SupervisorListaguardiaEquipoComponent } from './supervisor-listaguardia-equipo.component';

describe('SupervisorListaguardiaEquipoComponent', () => {
  let component: SupervisorListaguardiaEquipoComponent;
  let fixture: ComponentFixture<SupervisorListaguardiaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorListaguardiaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorListaguardiaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
