import { Request, Response } from "express";
import Order from "../models/Order";
import Service from "../models/Services";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const getAllServicesController = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json({ services, message: "Welcome to the client dashboard" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while trying to fetch the services", error });
  }
};

export const createOrderController = async (
  req: AuthRequest,
  res: Response
) => {
  const { additionalParts } = req.body;
  const { serviceId } = req.params;
  const clientId = req.user?.id;

  try {
    const newOrder = new Order({
      clientId,
      serviceId,
      additionalParts,
    });

    await newOrder.save();
    res.status(201).json({
      message: "Order has placed successfully and sent to admin",
      newOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order. Please try again.", error });
  }
};

export const getClientsJobsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const Jobs = await Order.find({ clientId: req.user?.id })
      .populate("assignedWorker")
      .populate({
        path: "clientId",
        model: "User",
      });
    res.status(200).json(Jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};
