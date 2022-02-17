import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCycleComponent } from './delete-cycle.component';

describe('DeleteCycleComponent', () => {
  let component: DeleteCycleComponent;
  let fixture: ComponentFixture<DeleteCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
