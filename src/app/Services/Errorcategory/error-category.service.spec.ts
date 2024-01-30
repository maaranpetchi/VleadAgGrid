import { TestBed } from '@angular/core/testing';

import { ErrorCategoryService } from './error-category.service';

describe('ErrorCategoryService', () => {
  let service: ErrorCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
