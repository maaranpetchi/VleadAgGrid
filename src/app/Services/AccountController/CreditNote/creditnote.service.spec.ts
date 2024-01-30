import { TestBed } from '@angular/core/testing';

import { CreditnoteService } from './creditnote.service';

describe('CreditnoteService', () => {
  let service: CreditnoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditnoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
