import { Router } from "express";
import {
  CreateOrder,
  getAllOrderAdmin,
  getAllOrderUser,
  UpdateOrderStatus,
} from "../controller/order.controller.js";

const router = Router();

// create order

router.post("/create", CreateOrder);

router.post("/chageStatus/:id", UpdateOrderStatus);
router.get("/getAllOrderAdmin", getAllOrderAdmin);
router.get("/getAllOrderUser", getAllOrderUser);
// update order status

export default router;