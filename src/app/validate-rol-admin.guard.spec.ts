import { TestBed } from '@angular/core/testing';

import { ValidateRolAdminGuard } from './validate-rol-admin.guard';

describe('ValidateRolAdminGuard', () => {
  let guard: ValidateRolAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateRolAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
