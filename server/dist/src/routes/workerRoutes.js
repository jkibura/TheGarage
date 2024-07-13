"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const workerController_1 = require("../controllers/workerController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Route to fetch assigned jobs for the authenticated worker
router.get("/orders/assigned", (0, authMiddleware_1.authMiddleware)(["worker"]), workerController_1.getAssignedJobsController);
// Route to update job status
router.put("/orders/:orderId/status", (0, authMiddleware_1.authMiddleware)(["worker"]), workerController_1.updateJobStatusController);
module.exports = router;
