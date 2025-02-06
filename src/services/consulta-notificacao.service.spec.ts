import { TestBed } from '@angular/core/testing';

import { ConsultaNotificacaoService } from './consulta-notificacao.service';

describe('ConsultaNotificacaoService', () => {
  let service: ConsultaNotificacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaNotificacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
