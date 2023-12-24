import express from "express";
import { login, regitser, logOut}  from "../Controller/auth.js";
import cookieParser from "cookie-parser";
const router = express.Router()
router.use(cookieParser())

router.post("/register", regitser)
router.post("/login", login)
router.post("/logout", logOut)

export default router