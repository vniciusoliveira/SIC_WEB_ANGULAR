import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IndexComponent } from './index.component';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockCookieSession: any;

  beforeEach(async () => {
    // Mock do Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Mock do ActivatedRoute
    mockActivatedRoute = {
      queryParams: of({
        [btoa('matricula')]: btoa('12345'),
        rota: 'inovAI',
      }),
    };

    // Mock do CookieSession
    mockCookieSession = {
      setCookie: jasmine.createSpy('setCookie'),
      IsLogged: jasmine.createSpy('IsLogged').and.returnValue(true),
    };

    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CookieSession, useValue: mockCookieSession },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cookie and navigate based on query params', () => {
    expect(mockCookieSession.setCookie).toHaveBeenCalledWith(
      btoa('matricula'),
      '12345',
      1
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inovAI']);
  });

  it('should redirect to login if not logged in', () => {
    mockCookieSession.IsLogged.and.returnValue(false);
    component.ngOnInit();
    expect(window.location.href).toBe(
      'http://admweb.tmkt.servicos.mkt/SIC_WEB/LOGIN.ASPX'
    );
  });
});
