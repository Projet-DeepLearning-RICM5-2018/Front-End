import { TestBed, inject } from '@angular/core/testing';

import { UserAuthGuardService } from './user-auth-guard.service';

describe('UserAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthGuardService]
    });
  });

  it('should be created', inject([UserAuthGuardService], (service: UserAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
