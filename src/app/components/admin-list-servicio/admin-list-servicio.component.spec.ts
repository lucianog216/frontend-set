import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListServicioComponent } from './admin-list-servicio.component';

describe('AdminListServicioComponent', () => {
  let component: AdminListServicioComponent;
  let fixture: ComponentFixture<AdminListServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
