import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorProfileListComponent } from './supervisor-profile-list.component';

describe('SupervisorProfileListComponent', () => {
  let component: SupervisorProfileListComponent;
  let fixture: ComponentFixture<SupervisorProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorProfileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
