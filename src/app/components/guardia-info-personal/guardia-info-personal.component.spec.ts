import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaInfoPersonalComponent } from './guardia-info-personal.component';

describe('GuardiaInfoPersonalComponent', () => {
  let component: GuardiaInfoPersonalComponent;
  let fixture: ComponentFixture<GuardiaInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
