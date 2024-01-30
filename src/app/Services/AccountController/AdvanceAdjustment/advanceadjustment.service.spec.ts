import { TestBed } from '@angular/core/testing';

import { AdvanceadjustmentService } from './advanceadjustment.service';

describe('AdvanceadjustmentService', () => {
  let service: AdvanceadjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvanceadjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
