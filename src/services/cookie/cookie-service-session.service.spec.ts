import { TestBed } from '@angular/core/testing';

import { CookieServiceSessionService } from './cookie-service-session.service';

describe('CookieServiceSessionService', () => {
  let service: CookieServiceSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieServiceSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
