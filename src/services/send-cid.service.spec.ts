import { TestBed } from '@angular/core/testing';

import { SendCidService } from './send-cid.service';

describe('SendCidService', () => {
  let service: SendCidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendCidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
