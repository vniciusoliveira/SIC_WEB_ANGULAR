import { TestBed } from '@angular/core/testing';

import { CachesService } from './caches.service';

describe('CachesService', () => {
  let service: CachesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
