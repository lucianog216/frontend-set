import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquiposAdmComponent } from './add-equipos-adm.component';

describe('AddEquiposAdmComponent', () => {
  let component: AddEquiposAdmComponent;
  let fixture: ComponentFixture<AddEquiposAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEquiposAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEquiposAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
