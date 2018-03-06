import { TestBed, inject } from '@angular/core/testing';

import { CurrentOfferService } from './current-offer.service';

describe('CurrentOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentOfferService]
    });
  });

  it('should be created', inject([CurrentOfferService], (service: CurrentOfferService) => {
    expect(service).toBeTruthy();
  }));
});
