import express from "express"
import IndexRouter from "./route/index.route.js";
import dbConnect from "./config/db.js";
import dotenv from "dotenv";
import UserRouter from "./route/user.route.js"
import AuthRouter from "./route/auth.route.js"
import FoodRouter from "./route/food.route.js";
import OrderRouter from "./route/order.route.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
//function that need to be initialized before server starting
dotenv.config()

//server variable
const app = express()
const PORT = process.env.PORT

//app use files
app.use(cors({
    origin: env.APP_URL,
    credentials: true   
}))
app.use(express.json());
app.use(cookieParser());
app.use(IndexRouter);
app.use("/user",UserRouter)
app.use("/auth",AuthRouter)
app.use("/food",FoodRouter)
app.use("/order", OrderRouter);
// Static frontend
app.use(express.static(path.join(__dirname, "../../", "client/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "client/dist", "index.html"));
});

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`server in running at http://localhost:${PORT}`)
})