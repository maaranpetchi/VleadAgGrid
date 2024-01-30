import { TestBed } from '@angular/core/testing';

import { ScopechangeService } from './scopechange.service';

describe('ScopechangeService', () => {
  let service: ScopechangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScopechangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
