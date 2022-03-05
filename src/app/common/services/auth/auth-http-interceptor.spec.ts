import { TestBed } from '@angular/core/testing'
import { TestingModule } from '../../testing/testing.module'
import { AuthHttpInterceptor } from './auth-http-interceptor'

describe('AuthHttpInterceptor', () => {
  let service: AuthHttpInterceptor

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [{ provide: AuthHttpInterceptor, useClass: AuthHttpInterceptor }],
    })

    service = TestBed.inject(AuthHttpInterceptor)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('intercept()', () => {
    it('should call next.handle().pipe()', () => {
      service['authService'].getToken = jasmine.createSpy<any>()
      const req = jasmine.createSpyObj<any>('HttpRequest', {
        clone: function () {
          return {}
        },
      })
      const spy = jasmine.createSpy<any>()
      const next = jasmine.createSpyObj<any>('HttpHandler', {
        handle: {
          pipe: spy,
        },
      })
      service.intercept(req, next)
      expect(spy).toHaveBeenCalled()
    })
  })
})
