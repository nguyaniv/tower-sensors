"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSensorData = void 0;
const utills_1 = require("../lib/utills");
const sensors_1 = require("../models/sensors");
const sensorController_1 = require("./sensorController");
const postSensorData = (req, res) => {
    const data = req.body;
    const sensor = (0, sensorController_1.addSensorData)(data);
    if (sensor) {
        (0, utills_1.checkMalfunctioningSensor)(sensor, sensors_1.sensors);
    }
    res.sendStatus(200);
};
exports.postSensorData = postSensorData;
