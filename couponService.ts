import Course from "./models/course";
import Coupon from "./models/coupon";

class CouponService {
  coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  // Single Responsibility Principle (SRP):
  // - The addCoupon method is responsible for adding coupons to the coupons array.
  addCoupon(coupon: Coupon): void {
    this.coupons.push(coupon);
  }

  // Single Responsibility Principle (SRP):
  // - The applyCoupon method is responsible for applying a coupon to a course.
  // - It delegates the finding of the coupon to the findCouponByCode method and
  //   the calculation of the discount amount to the calculateDiscountAmount method.
  // - It returns a result object containing information about the application result.
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

    const discountAmount = this.calculateDiscountAmount(course, coupon);

    if (discountAmount === null) {
      return {
        applied: false,
        reason: "Coupon percent discount less than 100",
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

  // Single Responsibility Principle (SRP):
  // - The findCouponByCode method is responsible for finding a coupon by its code.
  findCouponByCode(code: string): Coupon | undefined {
    return this.coupons.find(coupon => coupon.code === code);
  }

  // Single Responsibility Principle (SRP):
  // - The calculateDiscountAmount method is responsible for calculating the discount amount for a coupon and a course.
  // - It returns the discount amount or null if the coupon is invalid.
  private calculateDiscountAmount(course: Course, coupon: Coupon): number | null {
    if (coupon.discountPriceAmount !== null) {
      return coupon.discountPriceAmount;
    } else if (coupon.discountPercentAmount !== null) {
      if (coupon.discountPercentAmount > 100) {
        return null;
      } else {
        return (coupon.discountPercentAmount / 100) * course.price;
      }
    }
    return null;
  }
}

export default CouponService;
