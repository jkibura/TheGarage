"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Handling of specific requests to specific routes
router.post("/register", authController_1.registerController);
router.post("/login", authController_1.loginController);
module.exports = router;
