import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TestingModule } from 'src/app/common/testing/testing.module'

import { SignUpVerificationComponent } from './sign-up-verification.component'

describe('SignUpVerificationComponent', () => {
  let component: SignUpVerificationComponent
  let fixture: ComponentFixture<SignUpVerificationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpVerificationComponent],
      imports: [TestingModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: { email: 'test@test.com' } }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpVerificationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
