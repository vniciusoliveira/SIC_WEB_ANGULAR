import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNotificacaoEloginComponent } from './consulta-notificacao-elogin.component';

describe('ConsultaNotificacaoEloginComponent', () => {
  let component: ConsultaNotificacaoEloginComponent;
  let fixture: ComponentFixture<ConsultaNotificacaoEloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaNotificacaoEloginComponent]
    });
    fixture = TestBed.createComponent(ConsultaNotificacaoEloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
