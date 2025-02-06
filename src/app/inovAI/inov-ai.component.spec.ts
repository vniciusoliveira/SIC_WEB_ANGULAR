import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InovAIComponent } from './inov-ai.component';

describe('InovAIComponent', () => {
  let component: InovAIComponent;
  let fixture: ComponentFixture<InovAIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InovAIComponent]
    });
    fixture = TestBed.createComponent(InovAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
""
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});