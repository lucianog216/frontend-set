import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEquiposAdmComponent } from './lista-equipos-adm.component';

describe('ListaEquiposAdmComponent', () => {
  let component: ListaEquiposAdmComponent;
  let fixture: ComponentFixture<ListaEquiposAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEquiposAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEquiposAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
