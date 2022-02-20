import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { DeleteCycleComponent } from './delete-cycle.component'

describe('DeleteCycleComponent', () => {
  let component: DeleteCycleComponent
  let fixture: ComponentFixture<DeleteCycleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCycleComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCycleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
