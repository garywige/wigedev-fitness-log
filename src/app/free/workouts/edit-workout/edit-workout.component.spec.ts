import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditWorkoutComponent } from './edit-workout.component'
import { Set } from './set'
import { TestingModule } from 'src/app/common/testing/testing.module'

describe('EditWorkoutComponent', () => {
  let component: EditWorkoutComponent
  let fixture: ComponentFixture<EditWorkoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWorkoutComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit()', () => {
    it('should subscribe to the selectedCycleId in edit mode', () => {
      component.isEditMode = true
      component['workoutService'].selectedCycleId$.pipe = jasmine.createSpy<any>().and.returnValue({
        subscribe() {},
      })
      component['ngOnInit']()
      expect(component['workoutService'].selectedCycleId$.pipe).toHaveBeenCalled()
    })
  })

  describe('openSetDialog()', () => {
    it('should call uiService showDialog()', () => {
      component['uiService'].showDialog = jasmine.createSpy<any>().and.returnValue({
        afterClosed() {
          return {
            subscribe() {},
          }
        },
      })
      component.openSetDialog()
      expect(component['uiService'].showDialog).toHaveBeenCalled()
    })
  })

  describe('openDeleteDialog()', () => {
    it('should call uiService.showDialog()', () => {
      component['uiService'].showDialog = jasmine.createSpy<any>().and.returnValue({
        afterClosed() {
          return {
            pipe() {
              return {
                subscribe() {},
              }
            },
          }
        },
      })
      component.openDeleteDialog()
      expect(component['uiService'].showDialog).toHaveBeenCalled()
    })
  })

  describe('addSet()', () => {
    beforeEach(() => {
      let set: Set = {
        exercise: {
          id: 'test',
          name: 'test',
        },
        weight: 1,
        unit: 'test',
        reps: 1,
        completed: null,
      }

      component.addSet(set)
    })

    it('should populate groups array', () => {
      expect(component.groups.length).toBeGreaterThan(0)
    })
  })

  describe('onSubmit()', () => {
    it('should call groups.forEach()', () => {
      component.groups.forEach = jasmine.createSpy<any>()
      component.onSubmit()
      expect(component.groups.forEach).toHaveBeenCalled()
    })
  })

  describe('copySet()', () => {
    it('should call addSet()', () => {
      const spy = spyOn<any>(component, 'addSet')
      const set: Set = {
        exercise: {
          id: 'test',
          name: 'test'
        },
        weight: 1,
        unit: 'lbs',
        reps: 1,
        completed: 1
      }

      component.copySet(set)

      expect(spy).toHaveBeenCalled()
    })
  })
})
