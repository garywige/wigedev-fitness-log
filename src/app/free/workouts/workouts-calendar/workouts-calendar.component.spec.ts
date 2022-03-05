import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { WorkoutsCalendarComponent } from './workouts-calendar.component'

describe('WorkoutsCalendarComponent', () => {
  let component: WorkoutsCalendarComponent
  let fixture: ComponentFixture<WorkoutsCalendarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutsCalendarComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsCalendarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit()', () => {
    it('should call selectedCycleId$.pipe()', () => {
      component['workoutService'].selectedCycleId$.pipe = jasmine.createSpy<any>().and.returnValue({
        subscribe(){}
      })
      component.ngOnInit()
      expect(component['workoutService'].selectedCycleId$.pipe).toHaveBeenCalled()
    })
  })

  describe('generateCalendar()', () => {
    beforeEach(() => {
      component.generateCalendar()
    })

    it('should should populate weeks array', () => {
      expect(component.weeks.length).toBeGreaterThan(3)
    })
  })

  describe('monthBack()', () => {
    it('should call generateCalendar()', () => {
      const spy = spyOn<any>(component, 'generateCalendar')
      component.monthBack()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('monthForward()', () => {
    it('should call generateCalendar()', () => {
      const spy = spyOn<any>(component, 'generateCalendar')
      component.monthForward()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('openWorkoutDialog()', () => {
    it('should call showDialog()', () => {
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
      component.openWorkoutDialog(new Date())
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('loadData()', () => {
    it('should call api.readWorkouts()', () => {
      const spy = spyOn<any>(component['api'], 'readWorkouts').and.returnValue({
        pipe(){
          return {
            subscribe(){}
          }
        }
      })
      component.loadData('test')
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('hasWorkout()', () => {
    it('should call workouts.forEach()', () => {
      const spy = spyOn<any>(component.workouts, 'forEach')
      component.hasWorkout(1, 1, 1)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('convertToDate()', () => {
    it('should return date object that represents the parameter', () => {
      const year = 2022
      const month = 2
      const day = 4
      const result = component.convertToDate(year, month, day)
      expect(result).toEqual(new Date(Date.UTC(year, month, day)))
    })
  })
})
