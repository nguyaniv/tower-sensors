"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sensorController_1 = require("../controllers/sensorController");
const router = express_1.default.Router();
router.get('/sensors', (req, res) => {
    res.json(sensorController_1.sensors);
});
router.post('/sensor', (req, res) => {
    const data = req.body;
    const newSensor = (0, sensorController_1.addSensorData)(data);
    res.json(newSensor);
});
router.delete('/sensor', (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    const removedSensor = (0, sensorController_1.removeSensorById)(id);
    if (removedSensor) {
        console.log(`Sensor removed: Sensor ID ${removedSensor.id}`);
        res.json({ message: `Sensor removed: Sensor ID ${removedSensor.id}` });
    }
    else {
        res.status(404).json({ error: `Sensor with ID ${id} not found.` });
    }
});
exports.default = router;
