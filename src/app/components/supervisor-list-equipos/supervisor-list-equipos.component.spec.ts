import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorListEquiposComponent } from './supervisor-list-equipos.component';

describe('SupervisorListEquiposComponent', () => {
  let component: SupervisorListEquiposComponent;
  let fixture: ComponentFixture<SupervisorListEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorListEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorListEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
