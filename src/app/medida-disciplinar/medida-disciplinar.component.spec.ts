import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaDisciplinarComponent } from './medida-disciplinar.component';

describe('MedidaDisciplinarComponent', () => {
  let component: MedidaDisciplinarComponent;
  let fixture: ComponentFixture<MedidaDisciplinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidaDisciplinarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedidaDisciplinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
