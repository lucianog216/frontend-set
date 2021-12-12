import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClienteAdmComponent } from './add-cliente-adm.component';

describe('AddClienteAdmComponent', () => {
  let component: AddClienteAdmComponent;
  let fixture: ComponentFixture<AddClienteAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClienteAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClienteAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
