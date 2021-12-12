import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAddGuardiaEquipoComponent } from './supervisor-add-guardia-equipo.component';

describe('SupervisorAddGuardiaEquipoComponent', () => {
  let component: SupervisorAddGuardiaEquipoComponent;
  let fixture: ComponentFixture<SupervisorAddGuardiaEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorAddGuardiaEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorAddGuardiaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
