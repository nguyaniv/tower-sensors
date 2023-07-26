"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensors = exports.removeSensorById = exports.addSensorData = void 0;
const utills_1 = require("../lib/utills");
const types_1 = require("../types");
let sensors = [];
exports.sensors = sensors;
const numberOfSensors = 10000;
const addSensorData = (data) => {
    const { id, face, temperature, timestamp } = data;
    const sensor = sensors.find((s) => s.id === id && s.face === face);
    if (!sensor) {
        const newSensor = {
            id: (0, utills_1.generateTimestampUUID)() + 1,
            face,
            temperatures: [{ temperature, timestamp }],
        };
        sensors.push(newSensor);
        console.log('new sensor: ', newSensor);
        return newSensor;
    }
    else {
        sensor.temperatures.push({ temperature, timestamp });
        return sensor;
    }
};
exports.addSensorData = addSensorData;
const removeSensorById = (id) => {
    console.log(id);
    const index = sensors.findIndex((sensor) => sensor.id === id);
    if (index !== -1) {
        return sensors.splice(index, 1)[0];
    }
    return undefined;
};
exports.removeSensorById = removeSensorById;
const generateRandomSensors = () => {
    exports.sensors = sensors = [];
    const faces = [types_1.Face.North, types_1.Face.East, types_1.Face.South, types_1.Face.West];
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    for (let i = 1; i <= numberOfSensors; i++) {
        const randomFace = faces[Math.floor(Math.random() * faces.length)];
        const randomTemperature = getRandomTemperature();
        const randomTimestamp = Date.now() - Math.floor(Math.random() * 30 * millisecondsInADay);
        const newSensor = {
            id: (0, utills_1.generateTimestampUUID)() + 1,
            face: randomFace,
            temperatures: [
                { temperature: randomTemperature, timestamp: randomTimestamp },
            ],
        };
        sensors.push(newSensor);
    }
};
const getRandomTemperature = () => {
    return Math.random() * 50;
};
generateRandomSensors();
setInterval(utills_1.removeInactiveSensors, 60 * 60 * 1000);
