import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { WorkoutsComponent } from './workouts.component'

describe('WorkoutsComponent', () => {
  let component: WorkoutsComponent
  let fixture: ComponentFixture<WorkoutsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutsComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit()', () => {
    it('should call api.readCycles()', () => {
      const spy = spyOn<any>(component['api'], 'readCycles').and.returnValue({
        pipe(){
          return {
            subscribe(){}
          }
        }
      })
      component.ngOnInit()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('onSelectionChange()', () => {
    it('should call selectedCycleId$.next', () => {
      const spy = spyOn<any>(component['workoutService'].selectedCycleId$, 'next')
      component.onSelectionChange()
      expect(spy).toHaveBeenCalled()
    })
  })
})
