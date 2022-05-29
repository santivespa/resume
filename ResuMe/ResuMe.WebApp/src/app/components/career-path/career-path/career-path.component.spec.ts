import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPathComponent } from './career-path.component';

describe('CareerPathComponent', () => {
  let component: CareerPathComponent;
  let fixture: ComponentFixture<CareerPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
