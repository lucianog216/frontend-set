import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaAddServicioComponent } from './guardia-add-servicio.component';

describe('GuardiaAddServicioComponent', () => {
  let component: GuardiaAddServicioComponent;
  let fixture: ComponentFixture<GuardiaAddServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaAddServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaAddServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
