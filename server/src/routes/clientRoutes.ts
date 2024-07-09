import express from "express";
import {
  getAllServicesController,
  createOrderController,
  getClientsJobsController,
} from "../controllers/clientController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Client dashboard which is the homepage
router.get("/dashboard", authMiddleware(["client"]), getAllServicesController);

// Purchase a service
router.post(
  "/purchase/:serviceId",
  authMiddleware(["client"]),
  createOrderController
);

// Fetching jobs for the client
router.get("/jobs", authMiddleware(["client"]), getClientsJobsController);

export = router;
