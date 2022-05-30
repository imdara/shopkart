import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getStatistics = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  const users = await User.find({ isAdmin: false });
  const products = await Product.find();
  const orders = await Order.find();
  const ordersTotalArray = orders.map((order) => order.orderTotal);
  const revenue = ordersTotalArray.reduce((a, b) => a + b, 0);
  user.isAdmin
    ? res.status(200).send({
        users: users.length,
        products: products.length,
        orders: orders.length,
        revenue,
      })
    : res.status(400).send("You dont have access to this");
};
