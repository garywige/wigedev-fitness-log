import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { EditWorkoutComponent } from './edit-workout.component'
import { Set } from './set'

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

  describe('addSet()', () => {
    beforeEach(() => {
      let set: Set = {
        exercise: {
          id: 'test',
          name: 'test'
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
})
