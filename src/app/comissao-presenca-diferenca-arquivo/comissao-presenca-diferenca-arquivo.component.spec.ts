import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissaoPresencaDiferencaArquivoComponent } from './comissao-presenca-diferenca-arquivo.component';

describe('ComissaoPresencaDiferencaArquivoComponent', () => {
  let component: ComissaoPresencaDiferencaArquivoComponent;
  let fixture: ComponentFixture<ComissaoPresencaDiferencaArquivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComissaoPresencaDiferencaArquivoComponent]
    });
    fixture = TestBed.createComponent(ComissaoPresencaDiferencaArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
