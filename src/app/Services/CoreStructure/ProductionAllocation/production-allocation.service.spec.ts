import { TestBed } from '@angular/core/testing';

import { ProductionAllocationService } from './production-allocation.service';

describe('ProductionAllocationService', () => {
  let service: ProductionAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
