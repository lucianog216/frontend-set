import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDescripcionComponent } from './usuario-descripcion.component';

describe('UsuarioDescripcionComponent', () => {
  let component: UsuarioDescripcionComponent;
  let fixture: ComponentFixture<UsuarioDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDescripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
