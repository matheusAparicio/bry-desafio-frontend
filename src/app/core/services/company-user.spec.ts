import { TestBed } from '@angular/core/testing';

import { CompanyUserService } from './company-user';

describe('CompanyUser', () => {
  let service: CompanyUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
