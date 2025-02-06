import { TestBed } from '@angular/core/testing';

import { PremiacaoQueFazADiferencaServiceService } from './premiacao-que-faz-adiferenca-service.service';

describe('PremiacaoQueFazADiferencaServiceService', () => {
  let service: PremiacaoQueFazADiferencaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremiacaoQueFazADiferencaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
