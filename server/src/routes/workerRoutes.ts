import express from "express";
import {
  getAssignedJobsController,
  updateJobStatusController,
} from "../controllers/workerController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Route to fetch assigned jobs for the authenticated worker
router.get(
  "/jobs/assigned",
  authMiddleware(["worker"]),
  getAssignedJobsController
);

// Route to update job status
router.put(
  "/jobs/:orderId/status",
  authMiddleware(["worker"]),
  updateJobStatusController
);

export = router;
