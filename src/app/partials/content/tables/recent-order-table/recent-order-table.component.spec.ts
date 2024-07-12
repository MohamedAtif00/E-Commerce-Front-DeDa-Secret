import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentOrderTableComponent } from './recent-order-table.component';

describe('RecentOrderTableComponent', () => {
  let component: RecentOrderTableComponent;
  let fixture: ComponentFixture<RecentOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentOrderTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
