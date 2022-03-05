import { TestBed } from '@angular/core/testing'

import { ApiService } from './api.service'
import { TestingModule } from '../../testing/testing.module'

describe('ApiService', () => {
  let service: ApiService

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    service = TestBed.inject(ApiService)

    // common spies
    service['http'].post = jasmine.createSpy<any>()
    service['http'].put = jasmine.createSpy<any>()
    service['http'].get = jasmine.createSpy<any>()
    service['http'].delete = jasmine.createSpy<any>()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('signup()', () => {
    it('should call post()', () => {

      // Act
      service.signup('test', 'test', 'test')

      // Assert
      expect(service['http'].post).toHaveBeenCalled()
    })
  })

  describe('signin()', () => {
    it('should call post()', () => {

      // Act
      service.signin('test', 'test')

      // Assert
      expect(service['http'].post).toHaveBeenCalled()
    })
  })
})
