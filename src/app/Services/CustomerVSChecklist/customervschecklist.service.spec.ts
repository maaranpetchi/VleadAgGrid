import { TestBed } from '@angular/core/testing';

import { CustomervschecklistService } from './customervschecklist.service';

describe('CustomervschecklistService', () => {
  let service: CustomervschecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomervschecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
