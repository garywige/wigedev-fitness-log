import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { EditCycleComponent } from './edit-cycle.component'

describe('EditCycleComponent', () => {
  let component: EditCycleComponent
  let fixture: ComponentFixture<EditCycleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCycleComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCycleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit()', () => {
    it('should call api.readCycle() when output.id is not null', () => {
      const spy = spyOn<any>(component['api'], 'readCycle').and.returnValue({
        pipe() {
          return {
            subscribe() {},
          }
        },
      })
      component.output.id = 'test'
      component.ngOnInit()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('onSubmit()', () => {
    it('should call form.get()', () => {
      const spy = spyOn<any>(component.form, 'get').and.returnValue({
        value: 'test',
      })

      component.onSubmit()

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('openDeleteDialog()', () => {
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
      component.openDeleteDialog()
      expect(spy).toHaveBeenCalled()
    })
  })
})
