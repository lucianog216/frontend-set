import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuardiaEquiposAdmComponent } from './add-guardia-equipos-adm.component';

describe('AddGuardiaEquiposAdmComponent', () => {
  let component: AddGuardiaEquiposAdmComponent;
  let fixture: ComponentFixture<AddGuardiaEquiposAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGuardiaEquiposAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuardiaEquiposAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
