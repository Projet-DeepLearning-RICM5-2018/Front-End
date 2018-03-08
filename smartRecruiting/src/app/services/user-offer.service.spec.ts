import { TestBed, inject } from '@angular/core/testing';

import { UserOfferService } from './user-offer.service';

describe('UserOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOfferService]
    });
  });

  it('should be created', inject([UserOfferService], (service: UserOfferService) => {
    expect(service).toBeTruthy();
  }));
});
