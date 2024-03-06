import Course from "./models/course"
import Coupon from "./models/coupon"


class CouponService {
  coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  addCoupon(coupon: Coupon): void {
    this.coupons.push(coupon);
  }

  applyCoupon(course: Course, couponCode: string): { applied: boolean, reason?: string, finalPrice: number } {
    const coupon = this.findCouponByCode(couponCode);
    if (!coupon) {
      return { applied: false, reason: "Coupon not found", finalPrice: course.price };
    }

    let discountAmount: number;

    if (coupon.discountPriceAmount !== null) {
      discountAmount = coupon.discountPriceAmount;
    } else if (coupon.discountPercentAmount !== null) {
      discountAmount = (coupon.discountPercentAmount / 100) * course.price;
    } else {
      return { applied: false, reason: "Invalid coupon", finalPrice: course.price };
    }

    if (discountAmount >= course.price) {
      return { applied: false, reason: "Coupon discount exceeds course price", finalPrice: 0 };
    }

    const finalPrice = course.price - discountAmount;
    return { applied: true, finalPrice };
  }

  findCouponByCode(code: string): Coupon | undefined {
    return this.coupons.find(coupon => coupon.code === code);
  }
}

export default CouponService
