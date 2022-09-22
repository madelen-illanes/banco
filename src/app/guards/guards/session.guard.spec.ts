import { TestBed } from '@angular/core/testing';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot, 
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service/auth.service';
import { SessionGuard } from './session.guard';

function fakeRouter(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot;
  }


describe('SessionGuard', () => {
  let guard: SessionGuard;
  let router: Router;

  let mockLoginService = {
    isLogged: true,
    login: jest.fn(),
    
  };
  let route = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: mockLoginService,
        },
      ],
    });
    guard = TestBed.inject(SessionGuard);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

//     describe('User Authenticated', () => {
//     beforeEach(() => {
//       mockLoginService.isLogged = true;
//     }); 

//     // it('Method canActivate returns true', () => {
//     //     let mockUrl = '/auth/login';
//     //     let canActivate = guard.canActivate(route, fakeRouter(mockUrl));
//     //     expect(canActivate).toBeTruthy();
//     //   });
//      });

    describe('User Not Authenticated', () => {
        beforeEach(() => {
          mockLoginService.isLogged = false;
        });
    
        it('calling the navigate method and canActivate returns false', () => {
          let mockUrl = '/admin/dashboard';
          let routerNavigate = jest
            .spyOn(router, 'navigate')
            .mockImplementation(() => Promise.resolve(true));
          let canActivate = guard.canActivate(route, fakeRouter(mockUrl));
    
          expect(canActivate).toBeFalsy();
    
          expect(routerNavigate).toBeCalled();
        });
      });
//   it('should redirect to auth/login if no user data', () => {
//     expect(guard.canActivate()).toBe(false);
//   });

//   it('you must navigate if you enter the user data', () => {
//     jest.spyOn(sessionStorage, 'getItem').mockReturnValue('test');
//     expect(guard.canActivate()).toBe(true);
//   });
});
