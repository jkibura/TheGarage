import express from "express";
import {
  getAllServicesController,
  createOrderController,
  getClientsOrdersController,
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

// Fetching orders for the client
router.get("/orders", authMiddleware(["client"]), getClientsOrdersController);

export = router;
