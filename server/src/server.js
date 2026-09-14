import express from "express";
import IndexRouter from "./route/index.route.js";
import dbConnect from "./config/db.js";
import dotenv from "dotenv";
import UserRouter from "./route/user.route.js";
import AuthRouter from "./route/auth.route.js";
import FoodRouter from "./route/food.route.js";
import OrderRouter from "./route/order.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration fixed
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(IndexRouter);
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.use("/food", FoodRouter);
app.use("/order", OrderRouter);

// Static frontend
app.use(express.static(path.join(__dirname, "../../", "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "client/dist", "index.html"));
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`server is running at http://localhost:${PORT}`);
});