"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const clientController_1 = require("../controllers/clientController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Client dashboard which is the homepage
router.get("/dashboard", (0, authMiddleware_1.authMiddleware)(["client"]), clientController_1.getAllServicesController);
// fetching a single service
router.get("/purchase/:serviceId", (0, authMiddleware_1.authMiddleware)(["client"]), clientController_1.getServiceByIdController);
// Purchase a service
router.post("/purchase/:serviceId", (0, authMiddleware_1.authMiddleware)(["client"]), clientController_1.createOrderController);
// Fetching orders for the client
router.get("/orders", (0, authMiddleware_1.authMiddleware)(["client"]), clientController_1.getClientsOrdersController);
module.exports = router;
