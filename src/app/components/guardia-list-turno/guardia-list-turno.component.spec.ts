import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaListTurnoComponent } from './guardia-list-turno.component';

describe('GuardiaListTurnoComponent', () => {
  let component: GuardiaListTurnoComponent;
  let fixture: ComponentFixture<GuardiaListTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaListTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaListTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
