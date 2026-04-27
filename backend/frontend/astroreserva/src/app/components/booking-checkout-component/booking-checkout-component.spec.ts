import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCheckoutComponent } from './booking-checkout-component';

describe('BookingCheckoutComponent', () => {
  let component: BookingCheckoutComponent;
  let fixture: ComponentFixture<BookingCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCheckoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCheckoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
