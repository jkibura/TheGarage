import express from "express";
import {
  getAllServicesController,
  createOrderController,
  getClientsOrdersController,
  getServiceByIdController,
} from "../controllers/clientController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Client dashboard which is the homepage
router.get("/dashboard", authMiddleware(["client"]), getAllServicesController);

// fetching a single service
router.get(
  "/purchase/:serviceId",
  authMiddleware(["client"]),
  getServiceByIdController
);

// Purchase a service
router.post(
  "/purchase/:serviceId",
  authMiddleware(["client"]),
  createOrderController
);

// Fetching orders for the client
router.get("/orders", authMiddleware(["client"]), getClientsOrdersController);

export = router;
