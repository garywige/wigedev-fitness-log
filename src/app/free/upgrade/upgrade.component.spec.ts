import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from 'src/app/common/testing/testing.module';
import { UpgradeComponent } from './upgrade.component';

describe('UpgradeComponent', () => {
  let component: UpgradeComponent;
  let fixture: ComponentFixture<UpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeComponent ],
      imports: [TestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call initializeCard()', () => {
      // Arrange
      window['Square'] = jasmine.createSpyObj('Square', {
        payments(){
          return {}
        }
      })

      const spy = spyOn<any>(component, 'initializeCard').and.returnValue({
        then(){
          return {
            catch(){}
          }
        }
      })

      // Act
      component.ngOnInit()

      // Assert
      expect(spy).toHaveBeenCalled()
    })
  })
});
