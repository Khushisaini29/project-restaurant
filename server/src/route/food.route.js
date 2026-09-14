import { Router } from "express";
import {
  CreateFood,
  GetOne,
  readAllData,
  updateFoodData,
  DeleteOne,
} from "../controller/food.controller.js";
import multer from "../libs/multer.cjs";
import roleMiddleware from "../libs/roleMiddleware.js";

const router = Router();

router.post(
  "/create",
  multer.array("foodImage"),
  roleMiddleware("admin"),
  CreateFood,
);
router.post("/updateFoodData/:id", roleMiddleware("admin"), updateFoodData);
router.get("/getAllFoods", roleMiddleware("admin", "user"), readAllData);
router.get("/getone/:id", roleMiddleware("admin", "user"), GetOne);
router.delete("/deleteOne/:id", roleMiddleware("admin"), DeleteOne);

export default router;