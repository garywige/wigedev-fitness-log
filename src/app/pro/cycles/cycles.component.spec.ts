import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { CyclesComponent } from './cycles.component'

describe('CyclesComponent', () => {
  let component: CyclesComponent
  let fixture: ComponentFixture<CyclesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CyclesComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('loadData()', () => {

    beforeEach(() => {
      // Arrange
      component['api'].readCycles = jasmine.createSpy<any>('readCycles', component['api'].readCycles).and.returnValue({
          pipe(){
            return {
              subscribe(){}
            }
          }
        })

      // Act
      component.loadData()
    })

    it('should call readCycles()', () => {
      expect(component['api'].readCycles).toHaveBeenCalled()
    })
  })
})
