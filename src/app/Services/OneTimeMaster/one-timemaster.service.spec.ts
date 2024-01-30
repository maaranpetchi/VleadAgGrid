import { TestBed } from '@angular/core/testing';

import { OneTimemasterService } from './one-timemaster.service';

describe('OneTimemasterService', () => {
  let service: OneTimemasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneTimemasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
