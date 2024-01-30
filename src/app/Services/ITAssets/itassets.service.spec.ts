import { TestBed } from '@angular/core/testing';

import { ItassetsService } from './itassets.service';

describe('ItassetsService', () => {
  let service: ItassetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItassetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
