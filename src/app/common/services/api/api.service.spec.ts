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

  describe('readCycles()', () => {
    it('should call get()', () => {
      // Act
      service.readCycles()

      // Assert
      expect(service['http'].get).toHaveBeenCalled()
    })
  })

  describe('createCycle()', () => {
    it('should call post()', () => {
      // Act
      service.createCycle('test')

      // Assert
      expect(service['http'].post).toHaveBeenCalled()
    })
  })

  describe('readCycle()', () => {
    it('should call get()', () => {
      // Act
      service.readCycle('test')

      // Assert
      expect(service['http'].get).toHaveBeenCalled()
    })
  })

  describe('updateCycle()', () => {
    it('should call put()', () => {
      // Act
      service.updateCycle('test', 'test')

      // Assert
      expect(service['http'].put).toHaveBeenCalled()
    })
  })

  describe('deleteCycle()', () => {
    it('should call delete()', () => {
      // Act
      service.deleteCycle('test')

      // Assert
      expect(service['http'].delete).toHaveBeenCalled()
    })
  })

  describe('readExercises()', () => {
    it('should call get()', () => {
      // Act
      service.readExercises()

      // Assert
      expect(service['http'].get).toHaveBeenCalled()
    })
  })

  describe('createExercise()', () => {
    it('should call post()', () => {
      // Act
      service.createCycle('test')

      // Assert
      expect(service['http'].post).toHaveBeenCalled()
    })
  })

  describe('readExercise()', () => {
    it('should call get()', () => {
      // Act
      service.readExercise('test')

      // Assert
      expect(service['http'].get).toHaveBeenCalled()
    })
  })

  describe('updateExercise()', () => {
    it('should call put()', () => {
      // Act
      service.updateExercise('test', 'test')

      // Assert
      expect(service['http'].put).toHaveBeenCalled()
    })
  })

  describe('deleteExercise()', () => {
    it('should call delete()', () => {
      // Act
      service.deleteExercise('test')

      // Assert
      expect(service['http'].delete).toHaveBeenCalled()
    })
  })

  describe('readWorkouts()', () => {
    it('should call get()', () => {
      // Act
      service.readWorkouts('test')

      // Assert
      expect(service['http'].get).toHaveBeenCalled()
    })
  })

  describe('createWorkout()', () => {
    it('should call post()', () => {
      // Act
      service.createWorkout(new Date(), 'test', [])

      // Assert
      expect(service['http'].post).toHaveBeenCalled()
    })
  })

  describe('readWorkout()', () => {
    it('should call get()', () => {
      // Act
      service.readWorkout(new Date(), 'test')

      // Assert
      expect(service['http'].get).toHaveBeenCalled()
    })
  })

  describe('updateWorkout()', () => {
    it('should call put()', () => {
      // Act
      service.updateWorkout(new Date(), 'test', [])

      // Assert
      expect(service['http'].put).toHaveBeenCalled()
    })
  })

  describe('deleteWorkout()', () => {
    it('should call delete()', () => {
      // Act
      service.deleteWorkout(new Date(), 'test')

      // Assert
      expect(service['http'].delete).toHaveBeenCalled()
    })
  })

  describe('toDateString()', () => {
    it('should output date in format of YYYY-MM-DD', () => {
      // Act
      const result = service['toDateString'](new Date())

      // Assert
      expect(/^\d{4}-\d{2}-\d{2}$/.test(result)).toEqual(true)
    })
  })
})
