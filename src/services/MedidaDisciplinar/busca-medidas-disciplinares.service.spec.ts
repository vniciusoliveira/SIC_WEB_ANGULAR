import { TestBed } from '@angular/core/testing';

import { BuscaMedidasDisciplinaresService } from './busca-medidas-disciplinares.service';

describe('BuscaMedidasDisciplinaresService', () => {
  let service: BuscaMedidasDisciplinaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaMedidasDisciplinaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
