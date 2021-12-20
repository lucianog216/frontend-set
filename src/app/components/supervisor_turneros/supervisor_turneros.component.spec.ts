/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Supervisor_turnerosComponent } from './supervisor_turneros.component';

describe('Supervisor_turnerosComponent', () => {
  let component: Supervisor_turnerosComponent;
  let fixture: ComponentFixture<Supervisor_turnerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Supervisor_turnerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Supervisor_turnerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
