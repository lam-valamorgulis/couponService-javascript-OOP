class Coupon {
  discountPriceAmount: number | null;
  discountPercentAmount: number | null;
  code: string;

  constructor(code: string, discountPriceAmount: number | null, discountPercentAmount: number | null) {
    this.code = code;
    this.discountPriceAmount = discountPriceAmount;
    this.discountPercentAmount = discountPercentAmount;
  }
}

export default Coupon
