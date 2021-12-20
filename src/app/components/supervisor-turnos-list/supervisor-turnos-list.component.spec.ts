import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTurnosListComponent } from './supervisor-turnos-list.component';

describe('SupervisorTurnosListComponent', () => {
  let component: SupervisorTurnosListComponent;
  let fixture: ComponentFixture<SupervisorTurnosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorTurnosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorTurnosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
