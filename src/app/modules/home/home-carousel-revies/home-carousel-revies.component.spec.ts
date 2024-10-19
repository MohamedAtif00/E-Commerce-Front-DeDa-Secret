import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselReviesComponent } from './home-carousel-revies.component';

describe('HomeCarouselReviesComponent', () => {
  let component: HomeCarouselReviesComponent;
  let fixture: ComponentFixture<HomeCarouselReviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCarouselReviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarouselReviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
