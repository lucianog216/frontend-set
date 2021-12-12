import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewServicioComponent } from './admin-new-servicio.component';

describe('AdminNewServicioComponent', () => {
  let component: AdminNewServicioComponent;
  let fixture: ComponentFixture<AdminNewServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
