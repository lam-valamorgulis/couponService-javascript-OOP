import Course from "./models/course";
import Coupon from "./models/coupon";

class CouponService {
  coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  // Single Responsibility Principle (SRP):
  // - This method has a single responsibility: adding coupons to the list.
  addCoupon(coupon: Coupon): void {
    this.coupons.push(coupon);
  }

  // Open/Closed Principle (OCP):
  // - The applyCoupon method is open for extension (e.g., by adding new types of coupons) but closed for modification.
  // - It handles different types of coupons without needing modifications.
  // - This method could be further extended to handle more types of discounts without modifying its core logic.
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
      // Interface Segregation Principle (ISP):
      // - This part could be extracted into a separate method for better separation of concerns.
      // - But in this case, it's not necessary as the logic is concise.
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

  // Interface Segregation Principle (ISP):
  // - This method focuses solely on finding a coupon by code.
  // - It doesn't handle any other unrelated functionality.
  findCouponByCode(code: string): Coupon | undefined {
    return this.coupons.find(coupon => coupon.code === code);
  }
}

export default CouponService;
