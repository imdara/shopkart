// importing modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
config();

// importing routes
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import ordersRoute from "./routes/orders.js";
import paymentsRoute from "./routes/payments.js";
import statisticsRoute from "./routes/statistics.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// implementing routes
app.use("/api/auth", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/statistics", statisticsRoute);

app.get("/", (req, res) =>
  res.send({ statusCode: 200, message: "Server is up" })
);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(app.listen(PORT, () => console.log("Connected to the database")))
  .catch((err) => console.log(err));
