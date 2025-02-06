import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCidPagComponent } from './cadastro-cid-pag.component';

describe('CadastroCidPagComponent', () => {
  let component: CadastroCidPagComponent;
  let fixture: ComponentFixture<CadastroCidPagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCidPagComponent]
    });
    fixture = TestBed.createComponent(CadastroCidPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
