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

  applyCoupon(course: Course, couponCode: string): { applied: boolean, reason?: string, message?: string, finalPrice: number } {
    const coupon = this.findCouponByCode(couponCode);
    if (!coupon) {
      return {
        applied: false,
        reason: "Coupon not found",
        message: `Can't apply coupon to this course`,
        finalPrice: course.price,
      };
    }

    let discountAmount: number;

    if (coupon.discountPriceAmount !== null) {
      discountAmount = coupon.discountPriceAmount;
    } else if (coupon.discountPercentAmount !== null) {
      if (coupon.discountPercentAmount > 100) {
        return {
          applied: false,
          reason: "Coupon discount percent must be less than 100",
          message: "Invalid percent discount coupon",
          finalPrice: course.price
        }

      } else {
        discountAmount = (coupon.discountPercentAmount / 100) * course.price;
      }
    } else {
      return {
        applied: false,
        reason: "Can't find valid coupon",
        message: "Invalid coupon",
        finalPrice: course.price
      };
    }

    if (discountAmount >= course.price) {
      return {
        applied: true,
        reason: "Coupon discount exceeds course price",
        message: `Successfully applied Coupon to course ${course.name}`,
        finalPrice: 0
      };
    }

    const finalPrice = course.price - discountAmount;
    return {
      applied: true,
      finalPrice,
      message: `Successfully applied Coupon to course ${course.name}`,
    };
  }

  findCouponByCode(code: string): Coupon | undefined {
    return this.coupons.find(coupon => coupon.code === code);
  }
}

export default CouponService
