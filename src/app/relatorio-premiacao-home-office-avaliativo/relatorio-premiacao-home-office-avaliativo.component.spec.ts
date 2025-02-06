import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPremiacaoHomeOfficeAvaliativoComponent } from './relatorio-premiacao-home-office-avaliativo.component';

describe('RelatorioPremiacaoHomeOfficeAvaliativoComponent', () => {
  let component: RelatorioPremiacaoHomeOfficeAvaliativoComponent;
  let fixture: ComponentFixture<RelatorioPremiacaoHomeOfficeAvaliativoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatorioPremiacaoHomeOfficeAvaliativoComponent]
    });
    fixture = TestBed.createComponent(RelatorioPremiacaoHomeOfficeAvaliativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
