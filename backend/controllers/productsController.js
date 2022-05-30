import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllProducts = async (req, res) => {
  var offset = req.query.offset;
  var limit = req.query.limit;
  const products = await Product.find();
  if (!offset && !limit) {
    offset = 0;
    limit = 12;
  }
  const limitedProducts = [];
  for (let i = offset; i < limit; i++) {
    limitedProducts.push(products[i]);
  }
  res.status(200).send(limitedProducts);
};

export const addProduct = async (req, res) => {
  const { id } = req.user;
  const { name, price, imageUrl } = req.body;
  const user = await User.findById(id);
  if (user.isAdmin) {
    await Product.create({ name, rating: 0, ratingCount: 0, price, imageUrl });
    res.send("Product added successfully");
  } else res.send("You're not authorized to add a product");
};
