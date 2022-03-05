import { AppComponent } from './app.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestingModule } from './common/testing/testing.module'
import { AuthService } from './common/services/auth/auth.service'
import { AuthServiceFake } from './common/testing/testing.fakes'

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AppComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should render title', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toContain('WFL')
  })

  describe('logout()', () => {
    it('should call authService.logout()', () => {
      const spy = spyOn<any>(component['authService'], 'logout')
      component.logout()
      expect(spy).toHaveBeenCalled()
    })

    it('should call router.navigate()', () => {
      const spy = spyOn<any>(component['router'], 'navigate')
      component.logout()
      expect(spy).toHaveBeenCalled()
    })
  })
})
