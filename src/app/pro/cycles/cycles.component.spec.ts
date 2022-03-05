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

  describe('ngOnInit()', () => {
    it('should call loadData()', () => {
      const spy = spyOn<any>(component, 'loadData')
      component.ngOnInit()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('loadData()', () => {
    it('should call readCycles()', () => {
      // Arrange
      component['api'].readCycles = jasmine.createSpy<any>('readCycles', component['api'].readCycles).and.returnValue({
        pipe() {
          return {
            subscribe() {},
          }
        },
      })

      // Act
      component.loadData()

      // Assert
      expect(component['api'].readCycles).toHaveBeenCalled()
    })
  })

  describe('openCycleDialog()', () => {
    it('should call uiService.showDialog()', () => {
      const spy = spyOn<any>(component['uiService'], 'showDialog').and.returnValue({
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
      component.openCycleDialog('test')
      expect(spy).toHaveBeenCalled()
    })
  })
})
