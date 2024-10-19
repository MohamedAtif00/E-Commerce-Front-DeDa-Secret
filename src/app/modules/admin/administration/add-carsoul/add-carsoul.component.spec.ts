import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarsoulComponent } from './add-carsoul.component';

describe('AddCarsoulComponent', () => {
  let component: AddCarsoulComponent;
  let fixture: ComponentFixture<AddCarsoulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCarsoulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarsoulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
