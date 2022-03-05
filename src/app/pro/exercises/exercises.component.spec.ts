import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { ExercisesComponent } from './exercises.component'

describe('ExercisesComponent', () => {
  let component: ExercisesComponent
  let fixture: ComponentFixture<ExercisesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExercisesComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit()', () => {
    it('should call loadData()', () => {
      const spy = spyOn<any>(component, 'loadData')
      component.ngOnInit()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('loadData()', () => {
    beforeEach(() => {
      // Arrange
      component['api'].readExercises = jasmine.createSpy<any>().and.returnValue({
          pipe(){
            return {
              subscribe(){}
            }
          }
        }
      )

      // Act
      component.loadData()
    })

    it('should call readExercises()', () => {
      expect(component['api'].readExercises).toHaveBeenCalled()
    })
  })

  describe('openExerciseDialog()', () => {
    it('should call uiService.showDialog()', () => {
      const spy = spyOn<any>(component['uiService'], 'showDialog').and.returnValue({
        afterClosed(){
          return {
            pipe(){
              return {
                subscribe(){}
              }
            }
          }
        }
      })
      component.openExerciseDialog()
      expect(spy).toHaveBeenCalled()
    })
  })
})
