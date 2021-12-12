import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClienteAdmComponent } from './lista-cliente-adm.component';

describe('ListaClienteAdmComponent', () => {
  let component: ListaClienteAdmComponent;
  let fixture: ComponentFixture<ListaClienteAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaClienteAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaClienteAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
