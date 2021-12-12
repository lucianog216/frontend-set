import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaListEquiposComponent } from './guardia-list-equipos.component';

describe('GuardiaListEquiposComponent', () => {
  let component: GuardiaListEquiposComponent;
  let fixture: ComponentFixture<GuardiaListEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaListEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaListEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
