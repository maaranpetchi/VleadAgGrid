import { TestBed } from '@angular/core/testing';

import { BuddyProofService } from './buddy-proof.service';

describe('BuddyProofService', () => {
  let service: BuddyProofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuddyProofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
