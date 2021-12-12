import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCalendarioComponent } from './supervisor-calendario.component';

describe('SupervisorCalendarioComponent', () => {
  let component: SupervisorCalendarioComponent;
  let fixture: ComponentFixture<SupervisorCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorCalendarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
