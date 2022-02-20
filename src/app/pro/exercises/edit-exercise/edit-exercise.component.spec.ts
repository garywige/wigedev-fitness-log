import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { EditExerciseComponent } from './edit-exercise.component'

describe('EditExerciseComponent', () => {
  let component: EditExerciseComponent
  let fixture: ComponentFixture<EditExerciseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExerciseComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
