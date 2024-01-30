import { TestBed } from '@angular/core/testing';

import { NonbillablejobsService } from './nonbillablejobs.service';

describe('NonbillablejobsService', () => {
  let service: NonbillablejobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonbillablejobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
