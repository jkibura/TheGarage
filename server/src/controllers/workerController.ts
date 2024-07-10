import { Request, Response } from "express";
import Order from "../models/Order";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const getAssignedJobsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const orders = await Order.find({ assignedWorker: req.user?.id })
      .populate("serviceId", "name")
      .populate("clientId", "username");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assigned jobs", error });
  }
};

export const updateJobStatusController = async (
  req: AuthRequest,
  res: Response
) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      !order.assignedWorker ||
      order.assignedWorker.toString() !== req.user?.id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update job status" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Job status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating job status", error });
  }
};
