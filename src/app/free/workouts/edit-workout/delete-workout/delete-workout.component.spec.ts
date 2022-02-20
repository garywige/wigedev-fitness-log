import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { DeleteWorkoutComponent } from './delete-workout.component'

describe('DeleteWorkoutComponent', () => {
  let component: DeleteWorkoutComponent
  let fixture: ComponentFixture<DeleteWorkoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteWorkoutComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWorkoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
