import { TestBed } from '@angular/core/testing'
import { TestingModule } from '../../testing/testing.module'

import { AuthGuardService } from './auth-guard.service'
import { Role } from './auth.enum'

describe('AuthGuardService', () => {
  let service: AuthGuardService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    service = TestBed.inject(AuthGuardService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('canLoad()', () => {
    it('should call checkLogin()', () => {
      service['checkLogin'] = jasmine.createSpy<any>()
      const route = jasmine.createSpyObj<any>('Route', [''])
      service.canLoad(route)
      expect(service['checkLogin']).toHaveBeenCalled()
    })
  })

  describe('canActivate()', () => {
    it('should call checkLogin()', () => {
      service['checkLogin'] = jasmine.createSpy<any>()
      const route = jasmine.createSpyObj<any>('Route', [''])
      const state = jasmine.createSpyObj<any>('RouterStateSnapshot', [''])
      service.canActivate(route, state)
      expect(service['checkLogin']).toHaveBeenCalled()
    })
  })

  describe('canActivateChild()', () => {
    it('should call checkLogin()', () => {
      const childRoute = jasmine.createSpyObj<any>('ActivateRouteSnapshot', [''])
      const state = jasmine.createSpyObj<any>('RouterStateSnapshot', [''])
      service['checkLogin'] = jasmine.createSpy<any>()
      service.canActivateChild(childRoute, state)
      expect(service['checkLogin']).toHaveBeenCalled()
    })
  })

  describe('checkLogin()', () => {
    it('should call authStatus$.pipe()', () => {
      service['authService'].authStatus$.pipe = jasmine.createSpy<any>()
      service['checkLogin']()
      expect(service['authService'].authStatus$.pipe).toHaveBeenCalled()
    })
  })

  describe('checkRoleMatch()', () => {
    let route: any

    beforeEach(() => {
      route = jasmine.createSpyObj<any>(
        'ActivatedRouteSnapshot',
        {},
        {
          data: {
            expectedRole: Role.Pro,
          },
        }
      )
    })

    it('should return true when the role matches', () => {
      const role = Role.Pro
      const result = service['checkRoleMatch'](role, route)
      expect(result).toEqual(true)
    })

    it("should return false when the role doesn't match", () => {
      const role = Role.Free
      const result = service['checkRoleMatch'](role, route)
      expect(result).toEqual(false)
    })
  })

  describe('showAlert()', () => {
    beforeEach(() => {
      service['uiService'].toast = jasmine.createSpy<any>()
    })

    it('should call toast() when not authorized', () => {
      const [isAuth, roleMatch] = [false, true]
      service['showAlert'](isAuth, roleMatch)
      expect(service['uiService'].toast).toHaveBeenCalled()
    })

    it("should call toast() when role doesn't match", () => {
      const [isAuth, roleMatch] = [true, false]
      service['showAlert'](isAuth, roleMatch)
      expect(service['uiService'].toast).toHaveBeenCalled()
    })
  })

  describe('getResolvedUrl()', () => {
    it('should call route.pathFromRoot.map()', () => {
      const route = jasmine.createSpyObj<any>('ActivatedRouteSnapshot', {}, { pathFromRoot: { map() {} } })
      route.pathFromRoot.map = jasmine.createSpy().and.returnValue({
        join() {
          return {
            replace() {},
          }
        },
      })

      service.getResolvedUrl(route)
      expect(route.pathFromRoot.map).toHaveBeenCalled()
    })
  })
})
