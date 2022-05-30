import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  rating: Number,
  ratingCount: Number,
  price: Number,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
