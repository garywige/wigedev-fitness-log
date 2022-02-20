import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/common/testing/testing.module';

import { EditCycleComponent } from './edit-cycle.component';

describe('EditCycleComponent', () => {
  let component: EditCycleComponent;
  let fixture: ComponentFixture<EditCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCycleComponent],
      imports: [TestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
