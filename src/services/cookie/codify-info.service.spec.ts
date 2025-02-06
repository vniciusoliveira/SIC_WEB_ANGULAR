import { TestBed } from '@angular/core/testing';

import { CodifyInfoService } from './codify-info.service';

describe('CodifyInfoService', () => {
  let service: CodifyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodifyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
