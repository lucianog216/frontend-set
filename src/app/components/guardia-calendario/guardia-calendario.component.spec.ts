import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaCalendarioComponent } from './guardia-calendario.component';

describe('GuardiaCalendarioComponent', () => {
  let component: GuardiaCalendarioComponent;
  let fixture: ComponentFixture<GuardiaCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaCalendarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
