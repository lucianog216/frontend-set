import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTurnosAdmComponent } from './add-turnos-adm.component';

describe('AddTurnosAdmComponent', () => {
  let component: AddTurnosAdmComponent;
  let fixture: ComponentFixture<AddTurnosAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTurnosAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTurnosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
