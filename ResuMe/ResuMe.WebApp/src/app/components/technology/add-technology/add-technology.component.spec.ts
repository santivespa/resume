import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnologyComponent } from './add-technology.component';

describe('AddTechnologyComponent', () => {
  let component: AddTechnologyComponent;
  let fixture: ComponentFixture<AddTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTechnologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
