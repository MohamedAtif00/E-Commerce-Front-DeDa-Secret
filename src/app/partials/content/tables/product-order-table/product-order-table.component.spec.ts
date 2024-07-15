import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderTableComponent } from './product-order-table.component';

describe('ProductOrderTableComponent', () => {
  let component: ProductOrderTableComponent;
  let fixture: ComponentFixture<ProductOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductOrderTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
