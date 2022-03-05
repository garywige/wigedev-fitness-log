import { TestBed } from '@angular/core/testing'

import { ApiService } from './api.service'
import { TestingModule } from '../../testing/testing.module'

describe('ApiService', () => {
  let service: ApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    service = TestBed.inject(ApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('signup()', () => {
    it('should call post()', () => {
      // Arrange
      service['http'].post = jasmine.createSpy<any>()

      // Act
      service.signup('test', 'test', 'test')

      // Assert
      expect(service['http'].post).toHaveBeenCalled()
    })
  })

  describe('signin()', () => {
    it('should call post()', () => {
      // Arrange
      service['http'].post = jasmine.createSpy<any>()

      // Act
      service.signin('test', 'test')

      // Assert
      expect(service['http'].post)
    })
  })
})
