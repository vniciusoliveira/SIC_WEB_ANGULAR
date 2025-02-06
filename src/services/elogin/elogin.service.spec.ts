import { TestBed } from '@angular/core/testing';

import { EloginService } from './elogin.service';

describe('EloginService', () => {
  let service: EloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
