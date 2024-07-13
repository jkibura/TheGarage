import { Request, Response } from "express";
import Order from "../models/Order";
import Service from "../models/Services";
import SpareParts from "../models/SpareParts";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const getAllServicesController = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    const spares = await SpareParts.find();
    res
      .status(200)
      .json({ services, spares, message: "Welcome to the client dashboard" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while trying to fetch the services", error });
  }
};

export const getServiceByIdController = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createOrderController = async (
  req: AuthRequest,
  res: Response
) => {
  const { additionalParts } = req.body;
  const { numberPlate } = req.body;
  const { timeOfService } = req.body;
  const { serviceId } = req.params;
  const clientId = req.user?.id;

  console.log("Request body:", req.body);
  console.log("Request params:", req.params);
  console.log("Authenticated user ID:", clientId);

  try {
    const newOrder = new Order({
      clientId,
      serviceId,
      additionalParts,
      numberPlate,
      timeOfService,
    });

    await newOrder.save();
    res.status(201).json({
      message: "Order has placed successfully and sent to admin",
      newOrder,
    });
  } catch (error) {
    console.log("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Error placing order. Please try again.", error });
  }
};

export const getClientsOrdersController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const Jobs = await Order.find({ clientId: req.user?.id })
      .populate("assignedWorker", "username")
      .populate({
        path: "clientId",
        model: "User",
      })
      .populate("serviceId", "name");
    res.status(200).json(Jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
