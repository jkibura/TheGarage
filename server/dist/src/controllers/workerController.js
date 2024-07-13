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
exports.updateJobStatusController = exports.getAssignedJobsController = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const getAssignedJobsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orders = yield Order_1.default.find({ assignedWorker: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id })
            .populate("serviceId", "name")
            .populate("clientId", "username");
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching assigned jobs", error });
    }
});
exports.getAssignedJobsController = getAssignedJobsController;
const updateJobStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderId } = req.params;
    const { status } = req.body;
    try {
        const order = yield Order_1.default.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (!order.assignedWorker ||
            order.assignedWorker.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id.toString())) {
            return res
                .status(403)
                .json({ message: "Unauthorized to update job status" });
        }
        order.status = status;
        yield order.save();
        res.json({ message: "Job status updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating job status", error });
    }
});
exports.updateJobStatusController = updateJobStatusController;
