import { TestBed } from "@angular/core/testing"
import { TestingModule } from "../../testing/testing.module"
import { ApiAuthService, TokenPackage } from "./auth.api.service"
import { Role } from "./auth.enum"

describe('ApiAuthService', () => {
  let service: ApiAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [{provide: ApiAuthService, useClass: ApiAuthService}]
    })

    service = TestBed.inject(ApiAuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('authProvider()', () => {
    it('should call api.signin()', () => {
      service['api'].signin = jasmine.createSpy<any>().and.returnValue({
        pipe(){}
      })
      service['authProvider']('test', 'test')
      expect(service['api'].signin).toHaveBeenCalled()
    })
  })

  describe('transformJwtToken()', () => {
    it('should return an object taht specifies the user role', () => {
      const token: TokenPackage = {
        id: 'test',
        email: 'test',
        role: Role.Pro
      }
      const result = service['transformJwtToken'](token)
      expect(result.userRole).toEqual(Role.Pro)
    })
  })

  describe('getCurrentUser()', () => {
    it('should call authStatus$.pipe()', () => {
      service['authStatus$'].pipe = jasmine.createSpy<any>()
      service['getCurrentUser']()
      expect(service['authStatus$'].pipe).toHaveBeenCalled()
    })
  })
})
