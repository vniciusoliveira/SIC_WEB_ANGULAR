import { TestBed } from '@angular/core/testing';

import { RelatorioHomeOfficeAvaliativoServiceService } from './relatorio-home-office-avaliativo-service.service';

describe('RelatorioHomeOfficeAvaliativoServiceService', () => {
  let service: RelatorioHomeOfficeAvaliativoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioHomeOfficeAvaliativoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
