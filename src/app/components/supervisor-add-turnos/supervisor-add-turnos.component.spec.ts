import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAddTurnosComponent } from './supervisor-add-turnos.component';

describe('SupervisorAddTurnosComponent', () => {
  let component: SupervisorAddTurnosComponent;
  let fixture: ComponentFixture<SupervisorAddTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorAddTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorAddTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
