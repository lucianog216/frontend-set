import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorListaGuardiasComponent } from './supervisor-lista-guardias.component';

describe('SupervisorListaGuardiasComponent', () => {
  let component: SupervisorListaGuardiasComponent;
  let fixture: ComponentFixture<SupervisorListaGuardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorListaGuardiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorListaGuardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
