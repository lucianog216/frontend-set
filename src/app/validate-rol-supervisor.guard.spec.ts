import { TestBed } from '@angular/core/testing';

import { ValidateRolSupervisorGuard } from './validate-rol-supervisor.guard';

describe('ValidateRolSupervisorGuard', () => {
  let guard: ValidateRolSupervisorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateRolSupervisorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
