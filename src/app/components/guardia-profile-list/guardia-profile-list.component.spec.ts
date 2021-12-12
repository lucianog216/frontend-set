import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaProfileListComponent } from './guardia-profile-list.component';

describe('GuardiaProfileListComponent', () => {
  let component: GuardiaProfileListComponent;
  let fixture: ComponentFixture<GuardiaProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaProfileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
