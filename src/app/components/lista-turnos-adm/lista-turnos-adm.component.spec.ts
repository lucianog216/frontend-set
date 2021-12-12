import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurnosAdmComponent } from './lista-turnos-adm.component';

describe('ListaTurnosAdmComponent', () => {
  let component: ListaTurnosAdmComponent;
  let fixture: ComponentFixture<ListaTurnosAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTurnosAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTurnosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
