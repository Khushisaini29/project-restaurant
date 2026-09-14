import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.send("Server is Running");
});

export default router;