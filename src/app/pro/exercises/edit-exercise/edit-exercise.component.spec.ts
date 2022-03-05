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

  describe('ngOnInit()', () => {
    it('should call api.readExercise when output.id is not null', () => {
      component.output.id = 'test'
      const spy = spyOn<any>(component['api'], 'readExercise').and.returnValue({
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

  describe('openDeleteDialog()', () => {
    it('should call uiService.showDialog()', () => {
      const spy = spyOn<any>(component['uiService'], 'showDialog').and.returnValue({
        afterClosed(){
          return {
            subscribe(){}
          }
        }
      })
      component.openDeleteDialog()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('onSubmit()', () => {
    it('should call form.get()', () => {
      const spy = spyOn<any>(component.form, 'get').and.returnValue({
        value: 'test'
      })

      component.onSubmit()
      expect(spy).toHaveBeenCalled()
    })
  })
})
