import express from "express";
import { userList } from "../controlers/Usercontroler.js";

const router = express.Router();

router.get("/", userList);

export default router;
