import { configDotenv } from "dotenv";

configDotenv();
const env = {
  PORT:process.env.PORT||5000,
  DBURI:process.env.DBURI||"mongodb://localhost:27017/",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  APP_URL:process.env.APP_URL||"/"
};

export default env;