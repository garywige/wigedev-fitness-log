import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from '../common/testing/testing.module'

import { SignUpComponent } from './sign-up.component'

describe('SignUpComponent', () => {
  let component: SignUpComponent
  let fixture: ComponentFixture<SignUpComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onSubmit()', () => {
    it('should call api.signup() when passwords match', () => {
      spyOn<any>(component.form, 'get').and.returnValue({
        value: 'test',
      })
      const spy = spyOn<any>(component['api'], 'signup').and.returnValue({
        subscribe() {},
      })
      component.onSubmit()
      expect(spy).toHaveBeenCalled()
    })
  })
})
