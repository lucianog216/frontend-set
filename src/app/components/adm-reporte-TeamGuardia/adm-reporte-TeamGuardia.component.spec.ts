/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdmReporteTeamGuardiaComponent } from './adm-reporte-TeamGuardia.component';

describe('AdmReporteTeamGuardiaComponent', () => {
  let component: AdmReporteTeamGuardiaComponent;
  let fixture: ComponentFixture<AdmReporteTeamGuardiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmReporteTeamGuardiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmReporteTeamGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
