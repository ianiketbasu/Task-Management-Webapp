import express from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", profile);

export default router
