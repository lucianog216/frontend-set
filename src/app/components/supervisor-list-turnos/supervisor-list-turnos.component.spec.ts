import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorListTurnosComponent } from './supervisor-list-turnos.component';

describe('SupervisorListTurnosComponent', () => {
  let component: SupervisorListTurnosComponent;
  let fixture: ComponentFixture<SupervisorListTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorListTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorListTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
