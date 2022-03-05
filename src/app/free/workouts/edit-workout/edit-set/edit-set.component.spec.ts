import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { EditSetComponent } from './edit-set.component'

describe('EditSetComponent', () => {
  let component: EditSetComponent
  let fixture: ComponentFixture<EditSetComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSetComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('loadExercises()', () => {
    beforeEach(() => {
      // Arrange
      component['api'].readExercises = jasmine.createSpy<any>().and.returnValue({
        pipe(){
          return {
            subscribe(){}
          }
        }
      })

      // Act
      component.loadExercises()
    })

    it('should call readExercises()', () => {
      // Assert
      expect(component['api'].readExercises).toHaveBeenCalled()
    })
  })
})
