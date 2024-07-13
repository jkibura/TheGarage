"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientsOrdersController = exports.createOrderController = exports.getServiceByIdController = exports.getAllServicesController = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Services_1 = __importDefault(require("../models/Services"));
const SpareParts_1 = __importDefault(require("../models/SpareParts"));
const getAllServicesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield Services_1.default.find();
        const spares = yield SpareParts_1.default.find();
        res
            .status(200)
            .json({ services, spares, message: "Welcome to the client dashboard" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error while trying to fetch the services", error });
    }
});
exports.getAllServicesController = getAllServicesController;
const getServiceByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Services_1.default.findById(req.params.serviceId);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json(service);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getServiceByIdController = getServiceByIdController;
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { additionalParts } = req.body;
    const { numberPlate } = req.body;
    const { timeOfService } = req.body;
    const { serviceId } = req.params;
    const clientId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log("Request body:", req.body);
    console.log("Request params:", req.params);
    console.log("Authenticated user ID:", clientId);
    try {
        const newOrder = new Order_1.default({
            clientId,
            serviceId,
            additionalParts,
            numberPlate,
            timeOfService,
        });
        yield newOrder.save();
        res.status(201).json({
            message: "Order has placed successfully and sent to admin",
            newOrder,
        });
    }
    catch (error) {
        console.log("Error placing order:", error);
        res
            .status(500)
            .json({ message: "Error placing order. Please try again.", error });
    }
});
exports.createOrderController = createOrderController;
const getClientsOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const Jobs = yield Order_1.default.find({ clientId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id })
            .populate("assignedWorker", "username")
            .populate({
            path: "clientId",
            model: "User",
        })
            .populate("serviceId", "name");
        res.status(200).json(Jobs);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});
exports.getClientsOrdersController = getClientsOrdersController;
