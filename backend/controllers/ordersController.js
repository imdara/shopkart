import Order from "../models/Order.js";
import User from "../models/User.js";

export const getAllOrders = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  const orders = await Order.find();
  user.isAdmin ? res.send(orders) : res.send("You dont have access to this");
};

export const getCurrentUserOrders = async (req, res) => {
  const { id } = req.user;
  const currentUser = await User.findById(id);
  const orders = await Order.find({ orderPlacedBy: currentUser.email });
  res.send(orders);
};
