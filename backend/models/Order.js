import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        imgUrl: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    orderPlacedBy: String,
    orderTotal: Number,
    address: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
