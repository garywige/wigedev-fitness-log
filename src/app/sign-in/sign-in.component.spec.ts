import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthService } from '../common/services/auth/auth.service'
import { AuthServiceFake } from '../common/testing/testing.fakes'
import { SignInComponent } from './sign-in.component'
import { TestingModule } from '../common/testing/testing.module'

describe('SignInComponent', () => {
  let component: SignInComponent
  let fixture: ComponentFixture<SignInComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [TestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onSubmit()', () => {
    it('should call authService.login()', () => {
      const spy = spyOn<any>(component['authService'], 'login').and.returnValue({
        subscribe() {},
      })
      component.onSubmit()
      expect(spy).toHaveBeenCalled()
    })
  })
})
