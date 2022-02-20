import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../common/services/auth/auth.service';
import { AuthServiceFake } from '../common/testing/testing.fakes';
import { TestingModule } from '../common/testing/testing.module';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [TestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
