import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationComponent } from './email-verification.component';
import { TestingModule } from '../common/testing/testing.module';

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerificationComponent ],
      imports: [TestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call verifyEmail()', () => {
      component['api'].verifyEmail = jasmine.createSpy().and.returnValue({
        pipe(){
          return {
            subscribe(){}
          }
        }
      })

      component.ngOnInit()

      expect(component['api'].verifyEmail).toHaveBeenCalled()
    })
  })
});
