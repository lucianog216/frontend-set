import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAgregarGuardiaComponent } from './supervisor-agregar-guardia.component';

describe('SupervisorAgregarGuardiaComponent', () => {
  let component: SupervisorAgregarGuardiaComponent;
  let fixture: ComponentFixture<SupervisorAgregarGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorAgregarGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorAgregarGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
