import mongoose from "mongoose";
import env from "./env.js";

const dbConnect = async () => {
  await mongoose.connect(env.DBURI);
  console.log("Connected DB SUccessfully");

  return;
};

export default dbConnect;