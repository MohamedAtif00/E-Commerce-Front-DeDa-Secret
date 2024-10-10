// coupon.model.ts
export interface Coupon {
  id?: string;
  code: string;
  discount: number;
  expirationDate: Date;
  isActive: boolean;
  usageLimit: number;
  usageCount?: number;
}
