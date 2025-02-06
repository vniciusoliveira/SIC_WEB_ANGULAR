import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaoAcessoEloginAntigoComponent } from './permissao-acesso-elogin-antigo.component';

describe('PermissaoAcessoEloginAntigoComponent', () => {
  let component: PermissaoAcessoEloginAntigoComponent;
  let fixture: ComponentFixture<PermissaoAcessoEloginAntigoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissaoAcessoEloginAntigoComponent]
    });
    fixture = TestBed.createComponent(PermissaoAcessoEloginAntigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
