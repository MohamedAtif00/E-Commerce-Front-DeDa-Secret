import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpAddressComponent } from './pickup-address.component';

describe('PickupAddressComponent', () => {
  let component: PickUpAddressComponent;
  let fixture: ComponentFixture<PickUpAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickUpAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PickUpAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
