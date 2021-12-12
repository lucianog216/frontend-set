import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSupervisorListComponent } from './usuario-supervisor-list.component';

describe('UsuarioSupervisorListComponent', () => {
  let component: UsuarioSupervisorListComponent;
  let fixture: ComponentFixture<UsuarioSupervisorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioSupervisorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioSupervisorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
