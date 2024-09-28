import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDropdownComponent } from './slide-dropdown.component';

describe('SlideDropdownComponent', () => {
  let component: SlideDropdownComponent;
  let fixture: ComponentFixture<SlideDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
