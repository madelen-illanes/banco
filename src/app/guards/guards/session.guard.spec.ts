import { TestBed } from '@angular/core/testing';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot,} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service/auth.service';
import { SessionGuard } from './session.guard';

function mockRouter(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot;
  }


describe('SessionGuard', () => {
  let guard: SessionGuard;
  let router: Router;

  let mockLoginService = {
    isLogin: true,
    login: jest.fn(),

  };
  let route = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService, useValue: mockLoginService,
        },
      ],
    });
    guard = TestBed.inject(SessionGuard);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


    describe('User Not Authenticated', () => {
        beforeEach(() => {
          mockLoginService. isLogin = false;
        });

        it('shared  canActivate returns false', () => {
          let mockUrl = '/auth/service';
          let routerNavigate = jest
            .spyOn(router, 'navigate')
            .mockImplementation(() => Promise.resolve(true));
          let canActivate = guard.canActivate(route,  mockRouter(mockUrl));

          expect(canActivate).toBeFalsy();

          expect(routerNavigate).toBeCalled();
        });
      });

});
