import { Request, Response } from "express";
import Order from "../models/Order";
import User from "../models/User";
import Service from "../models/Services";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const serviceController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, description, price } = req.body;
    const service = new Service({ name, description, price });
    await service.save();
    res.status(200).json({ message: "Service created successfully", service });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error });
  }
};

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("clientId")
      .populate("serviceId")
      .populate("assignedWorker");
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders. Please try again", error });
  }
};

export const allocateOrderController = async (req: Request, res: Response) => {
  const { orderId, workerId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const worker = await User.findById(workerId);
    if (!worker || !worker.role.includes("worker")) {
      return res
        .status(404)
        .json({ message: "Worker not found or not authorized" });
    }

    order.assignedWorker = workerId;
    await order.save();

    res.json({ message: "Order allocated to worker successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error allocating order to worker", error });
  }
};

export const deleteWorkerController = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.params;
    const worker = await User.findById(workerId);

    if (!worker || worker.role !== "worker") {
      return res.status(404).json({ message: "Worker not found" });
    }

    await User.findByIdAndDelete(workerId);
    res.json({ message: "Worker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting worker", error });
  }
};
