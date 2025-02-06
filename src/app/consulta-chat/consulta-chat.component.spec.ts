import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaChatComponent } from './consulta-chat.component';

describe('ConsultaChatComponent', () => {
  let component: ConsultaChatComponent;
  let fixture: ComponentFixture<ConsultaChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaChatComponent]
    });
    fixture = TestBed.createComponent(ConsultaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
