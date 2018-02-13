import { TestBed, inject } from '@angular/core/testing';

import { FoundFieldService } from './found-field.service';

describe('FoundFieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoundFieldService]
    });
  });

  it('should be created', inject([FoundFieldService], (service: FoundFieldService) => {
    expect(service).toBeTruthy();
  }));
});
