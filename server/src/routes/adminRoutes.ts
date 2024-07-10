import express from "express";
import {
  getAllOrdersController,
  deleteWorkerController,
  allocateOrderController,
  serviceController,
  getAllWorkersController,
} from "../controllers/adminController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Route for posting a service
router.post("/service/post", authMiddleware(["admin"]), serviceController);

// Route for handling fetching of orders available, which will be displayed at the admin dashboard
router.get("/orders", authMiddleware(["admin"]), getAllOrdersController);

// Route for fetching all workers
router.get("/workers", authMiddleware(["admin"]), getAllWorkersController);

// Route for allocating job to worker
router.post("/allocatejob", authMiddleware(["admin"]), allocateOrderController);

// Route to delete a worker
router.delete(
  "/workers/:workerId",
  authMiddleware(["admin"]),
  deleteWorkerController
);

export = router;
