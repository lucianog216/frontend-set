import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioGuardiaListComponent } from './usuario-guardia-list.component';

describe('UsuarioGuardiaListComponent', () => {
  let component: UsuarioGuardiaListComponent;
  let fixture: ComponentFixture<UsuarioGuardiaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioGuardiaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioGuardiaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
