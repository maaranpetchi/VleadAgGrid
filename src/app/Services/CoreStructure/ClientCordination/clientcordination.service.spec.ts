import { TestBed } from '@angular/core/testing';

import { ClientcordinationService } from './clientcordination.service';

describe('ClientcordinationService', () => {
  let service: ClientcordinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientcordinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
