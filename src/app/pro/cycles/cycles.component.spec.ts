import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/testing/testing.module';

import { CyclesComponent } from './cycles.component';

describe('CyclesComponent', () => {
  let component: CyclesComponent;
  let fixture: ComponentFixture<CyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CyclesComponent],
      imports: [TestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadData()', () => {
    beforeEach(() => {
      component.loadData();
    });

    it('should populate cycles array', () => {
      expect(component.cycles.length).toBeGreaterThan(0);
    });
  });
});
