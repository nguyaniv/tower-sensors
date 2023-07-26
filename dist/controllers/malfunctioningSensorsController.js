"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMulfunctioningSensors = void 0;
const utills_1 = require("../lib/utills");
const sensors_1 = require("../models/sensors");
const getMulfunctioningSensors = (req, res) => {
    const malfunctioningSensors = (0, utills_1.multyFunctinalSensor)(sensors_1.sensors);
    const malfunctioningSensorData = malfunctioningSensors.map((sensor) => ({
        id: sensor.id,
        averageValue: sensor.temperatures.reduce((sum, temp) => sum + temp.temperature, 0) /
            sensor.temperatures.length,
    }));
    console.log(malfunctioningSensorData);
    res.json(malfunctioningSensorData);
};
exports.getMulfunctioningSensors = getMulfunctioningSensors;
