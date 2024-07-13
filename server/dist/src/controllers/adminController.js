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
exports.deleteWorkerController = exports.getAllWorkersController = exports.allocateOrderController = exports.getAllOrdersController = exports.sparesController = exports.serviceController = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
const Services_1 = __importDefault(require("../models/Services"));
const SpareParts_1 = __importDefault(require("../models/SpareParts"));
const serviceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const { name, description, price } = req.body;
        const image = req.file
            ? /* req.file.path   */ `/uploads/${req.file.filename}`
            : "";
        const service = new Services_1.default({ name, description, price, image });
        yield service.save();
        res.status(200).json({ message: "Service created successfully", service });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating service", error });
    }
});
exports.serviceController = serviceController;
const sparesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const { name, description, price } = req.body;
        const image = req.file
            ? /* req.file.path   */ `/uploads/${req.file.filename}`
            : "";
        const spares = new SpareParts_1.default({ name, description, price, image });
        yield spares.save();
        res.status(200).json({ message: "Spares created successfully", spares });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating spares", error });
    }
});
exports.sparesController = sparesController;
const getAllOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find()
            .populate("clientId")
            .populate("serviceId")
            .populate("assignedWorker")
            .populate("numberPlate")
            .populate("timeOfService");
        res.status(200).json(orders);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching orders. Please try again", error });
    }
});
exports.getAllOrdersController = getAllOrdersController;
const allocateOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, workerId } = req.body;
    try {
        const order = yield Order_1.default.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const worker = yield User_1.default.findById(workerId);
        if (!worker || !worker.role.includes("worker")) {
            return res
                .status(404)
                .json({ message: "Worker not found or not authorized" });
        }
        order.assignedWorker = workerId;
        yield order.save();
        res.json({ message: "Order allocated to worker successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error allocating order to worker", error });
    }
});
exports.allocateOrderController = allocateOrderController;
const getAllWorkersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workers = yield User_1.default.find({ role: "worker" });
        if (!workers || workers.length === 0) {
            return res.status(404).json({ message: "Workers not found" });
        }
        res.status(200).json({ message: "Workers fetched successfully", workers });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching workers", error });
    }
});
exports.getAllWorkersController = getAllWorkersController;
const deleteWorkerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workerId } = req.params;
        const worker = yield User_1.default.findById(workerId);
        if (!worker || worker.role !== "worker") {
            return res.status(404).json({ message: "Worker not found" });
        }
        yield User_1.default.findByIdAndDelete(workerId);
        res.json({ message: "Worker deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting worker", error });
    }
});
exports.deleteWorkerController = deleteWorkerController;
