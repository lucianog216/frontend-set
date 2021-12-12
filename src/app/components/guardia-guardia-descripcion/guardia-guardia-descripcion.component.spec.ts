import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaGuardiaDescripcionComponent } from './guardia-guardia-descripcion.component';

describe('GuardiaGuardiaDescripcionComponent', () => {
  let component: GuardiaGuardiaDescripcionComponent;
  let fixture: ComponentFixture<GuardiaGuardiaDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaGuardiaDescripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaGuardiaDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
