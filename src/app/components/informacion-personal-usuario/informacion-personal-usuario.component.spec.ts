import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPersonalUsuarioComponent } from './informacion-personal-usuario.component';

describe('InformacionPersonalUsuarioComponent', () => {
  let component: InformacionPersonalUsuarioComponent;
  let fixture: ComponentFixture<InformacionPersonalUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPersonalUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPersonalUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
