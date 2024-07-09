import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController";
const router = express.Router();

// Handling of specific requests to specific routes
router.post("/register", registerController);
router.post("/login", loginController);

export = router;
