import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  authCheckController,
} from "../controllers/authController";
const router = express.Router();

// Handling of specific requests to specific routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/check", authCheckController);
export = router;
