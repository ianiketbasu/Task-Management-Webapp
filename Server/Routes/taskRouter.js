import express from "express";
import {
  createTask,
  deleteTask,
  getMyTask,
  getSingleTask,
  updateTask,
} from "../Controllers/taskController.js";

const router = express.Router();

router.post("/post", createTask);
router.delete("/delete/:id", deleteTask);
router.put("/update/:id", updateTask);
router.get("/mytasks", getMyTask);
router.get("/mytask/:id", getSingleTask);

export default router;
