import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppComponent } from './app.component'
import { TestingModule } from './common/testing/testing.module'

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
    let logoutSpy: jasmine.Spy<any>
    let navigateSpy: jasmine.Spy<any>

    beforeEach(() => {
      logoutSpy = spyOn<any>(component['authService'], 'logout')
      navigateSpy = spyOn<any>(component['router'], 'navigate')
    })

    it('should call authService.logout()', () => {
      component.logout()
      expect(logoutSpy).toHaveBeenCalled()
    })

    it('should call router.navigate()', () => {
      component.logout()
      expect(navigateSpy).toHaveBeenCalled()
    })
  })
})
