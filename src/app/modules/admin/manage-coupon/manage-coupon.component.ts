import { Component } from '@angular/core';
import { Coupon } from '../../../shared/model/coupon.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponService } from '../../../shared/services/coupon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-coupon',
  templateUrl: './manage-coupon.component.html',
  styleUrl: './manage-coupon.component.scss',
})
export class ManageCouponComponent {
  couponForm!: FormGroup;
  coupons: Coupon[] = [];

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCoupons();
  }

  // Initialize the form
  initializeForm() {
    this.couponForm = this.fb.group({
      code: ['', Validators.required],
      discount: [0, [Validators.required, Validators.min(1)]],
      expirationDate: ['', Validators.required],
      isActive: [true],
      usageLimit: [1, [Validators.required, Validators.min(1)]],
    });
  }

  // Load all coupons
  loadCoupons() {
    this.couponService.getCoupons().subscribe((data) => {
      if (data.isSuccess) {
        this.coupons = data.value;
      } else {
        this.toastr.error('Something Error');
      }
    });
  }

  // Add a new coupon
  onSubmit() {
    if (this.couponForm.invalid) return;

    const newCoupon: Coupon = {
      code: this.couponForm.value.code,
      discount: this.couponForm.value.discount,
      expirationDate: this.couponForm.value.expirationDate,
      isActive: this.couponForm.value.isActive,
      usageLimit: this.couponForm.value.usageLimit,
    };

    this.couponService.addCoupon(newCoupon).subscribe((data) => {
      if (data.isSuccess) {
        this.coupons.push(data.value);
        this.couponForm.reset(); // Reset the form after submission
        this.toastr.success('Coupon has been Added Successfully');
      } else {
        this.toastr.error(data.errors[0]);
      }
    });
  }
}
