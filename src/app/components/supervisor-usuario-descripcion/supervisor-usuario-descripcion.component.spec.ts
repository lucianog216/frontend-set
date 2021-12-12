import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorUsuarioDescripcionComponent } from './supervisor-usuario-descripcion.component';

describe('SupervisorUsuarioDescripcionComponent', () => {
  let component: SupervisorUsuarioDescripcionComponent;
  let fixture: ComponentFixture<SupervisorUsuarioDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorUsuarioDescripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorUsuarioDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
