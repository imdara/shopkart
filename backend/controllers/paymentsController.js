import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import User from "../models/User.js";

// initialize payment
export const placeAnOrder = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  await Order.create({
    products: req.body.products,
    orderPlacedBy: user.email,
    orderTotal: req.body.amount,
    address: user.address,
  });
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };
  instance.orders.create(options, (err, order) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Something went wrong");
    }
    res.status(200).send(order);
  });
};

// verify payment
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sign = razorpay_order_id + "" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");
  if (razorpay_signature == expectedSign) {
    return res.status(200).send("Payment verified successfully");
  } else {
    return res.status(400).send("Invalid signature sent");
  }
};
