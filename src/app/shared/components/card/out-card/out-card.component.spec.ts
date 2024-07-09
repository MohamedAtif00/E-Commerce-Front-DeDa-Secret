import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutCardComponent } from './out-card.component';

describe('OutCardComponent', () => {
  let component: OutCardComponent;
  let fixture: ComponentFixture<OutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
