import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorInfoPersonalComponent } from './supervisor-info-personal.component';

describe('SupervisorInfoPersonalComponent', () => {
  let component: SupervisorInfoPersonalComponent;
  let fixture: ComponentFixture<SupervisorInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
