import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/common/testing/testing.module';

import { EditSetComponent } from './edit-set.component';

describe('EditSetComponent', () => {
  let component: EditSetComponent;
  let fixture: ComponentFixture<EditSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSetComponent],
      imports: [TestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadExercises()', () => {
    beforeEach(() => {
      component.loadExercises();
    });

    it('should populate exercises array', () => {
      expect(component.exercises?.length).toBeGreaterThan(0);
    });
  });
});
