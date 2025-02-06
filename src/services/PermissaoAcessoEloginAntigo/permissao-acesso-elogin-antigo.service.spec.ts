import { TestBed } from '@angular/core/testing';

import { PermissaoAcessoEloginAntigoService } from './permissao-acesso-elogin-antigo.service';

describe('PermissaoAcessoEloginAntigoService', () => {
  let service: PermissaoAcessoEloginAntigoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissaoAcessoEloginAntigoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
