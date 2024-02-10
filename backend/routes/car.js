import express from "express";
import {
  createCar,
  getAllCars,
  getCarById,
} from "../controlers/Carcontroler.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllCars);
router.post("/new", verifyToken, createCar);
router.get("/:id", verifyToken, getCarById);

export default router;
