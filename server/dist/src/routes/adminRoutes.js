"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const upload_1 = __importDefault(require("../middleware/upload"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Route for posting a service
router.post("/service/post", (0, authMiddleware_1.authMiddleware)(["admin"]), upload_1.default.single("image"), adminController_1.serviceController);
// Route for posting spare parts
router.post("/service/spares", (0, authMiddleware_1.authMiddleware)(["admin"]), upload_1.default.single("image"), adminController_1.sparesController);
// Route for handling fetching of orders available, which will be displayed at the admin dashboard
router.get("/orders", (0, authMiddleware_1.authMiddleware)(["admin"]), adminController_1.getAllOrdersController);
// Route for fetching all workers
router.get("/workers", (0, authMiddleware_1.authMiddleware)(["admin"]), adminController_1.getAllWorkersController);
// Route for allocating job to worker
router.post("/allocatejob", (0, authMiddleware_1.authMiddleware)(["admin"]), adminController_1.allocateOrderController);
// Route to delete a worker
router.delete("/workers/:workerId", (0, authMiddleware_1.authMiddleware)(["admin"]), adminController_1.deleteWorkerController);
module.exports = router;
