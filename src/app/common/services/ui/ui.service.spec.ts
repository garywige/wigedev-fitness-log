import { TestBed } from '@angular/core/testing'
import { TestingModule } from '../../testing/testing.module'
import { UiService } from './ui.service'

describe('UiService', () => {
  let service: UiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    service = TestBed.inject(UiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('toast()', () => {
    it('should call snackbar.open()', () => {
      service['snackbar'].open = jasmine.createSpy<any>()
      service.toast('test')
      expect(service['snackbar'].open).toHaveBeenCalled()
    })
  })

  describe('showDialog()', () => {
    it('should call dialog.open()', () => {
      service['dialog'].open = jasmine.createSpy<any>()
      const component = jasmine.createSpyObj<any>('ComponentType', [''])
      service.showDialog(component)
      expect(service['dialog'].open).toHaveBeenCalled()
    })
  })

  describe('closeAllDialogs()', () => {
    it('should call dialog.closeAll()', () => {
      service['dialog'].closeAll = jasmine.createSpy<any>()
      service.closeAllDialogs()
      expect(service['dialog'].closeAll).toHaveBeenCalled()
    })
  })

  describe('upgradeToast()', () => {
    it('should call snackbar.open()', () => {
      // Arrange
      service['snackbar'].open = jasmine.createSpy().and.returnValue({
        onAction() {
          return {
            pipe() {
              return {
                subscribe() {},
              }
            },
          }
        },
      })

      // Act
      service.upgradeToast()

      // Assert
      expect(service['snackbar'].open).toHaveBeenCalled()
    })
  })
})
