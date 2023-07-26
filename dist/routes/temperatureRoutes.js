"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const temperatureController_1 = require("../controllers/temperatureController");
const router = express_1.default.Router();
router.get('/aggregated-temperature', temperatureController_1.getAggregatedTemperatures);
exports.default = router;
