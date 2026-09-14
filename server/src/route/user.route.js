import { Router } from "express";
import { getUser, saveUser } from "../controller/user.controller.js";

const router=Router()
router.get("/",async(req,res)=>{
    res.send("Welcome user API")
})

router.post("/save",saveUser)
router.post("/:id",getUser)

export default router