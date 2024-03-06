import * as http from 'http';
import Course from "./models/course"
import CouponService from "./couponService"
import Coupon from "./models/coupon"

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

const course = new Course("Testing-smartdev", 5000);
const service = new CouponService();
const coupon = new Coupon("10PERCENT", null, 111);
service.addCoupon(coupon)

console.log(service.applyCoupon(course, "10PERCENT"))


const port = 3000
const hostname = "0.0.0.0"
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});