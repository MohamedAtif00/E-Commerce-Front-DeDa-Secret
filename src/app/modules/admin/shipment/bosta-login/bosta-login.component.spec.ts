import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BostaLoginComponent } from './bosta-login.component';

describe('BostaLoginComponent', () => {
  let component: BostaLoginComponent;
  let fixture: ComponentFixture<BostaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BostaLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BostaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
