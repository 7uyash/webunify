import express from "express";
import { Register } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(Register);