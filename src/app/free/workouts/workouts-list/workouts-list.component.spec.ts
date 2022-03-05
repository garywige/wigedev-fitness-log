import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { WorkoutsListComponent } from './workouts-list.component'

describe('WorkoutsListComponent', () => {
  let component: WorkoutsListComponent
  let fixture: ComponentFixture<WorkoutsListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutsListComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('loadData()', () => {
    beforeEach(() => {
      // Arrange
      component['api'].readWorkouts = jasmine.createSpy<any>().and.returnValue({
        pipe(){
          return {
            subscribe(){}
          }
        }
      })

      // Act
      component.loadData('62225f6e848445b5c4ad085b')
    })

    it('should call readWorkouts()', () => {
      // Assert
      expect(component['api'].readWorkouts).toHaveBeenCalled()
    })
  })
})
