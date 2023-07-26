"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTimestampUUID = exports.removeInactiveSensors = exports.generateRandomSensors = exports.multyFunctinalSensor = exports.removeSensorById = exports.addSensorData = exports.checkMalfunctioningSensor = exports.calculateDeviationPercentage = exports.calculateAverageTemperature = exports.getRandomTemperature = void 0;
const types_1 = require("../types");
const getRandomTemperature = () => {
    return Math.random() * 10 * 5;
};
exports.getRandomTemperature = getRandomTemperature;
function calculateAverageTemperature(temperatures) {
    return (temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length);
}
exports.calculateAverageTemperature = calculateAverageTemperature;
function calculateDeviationPercentage(value, reference) {
    return (Math.abs(value - reference) / reference) * 100;
}
exports.calculateDeviationPercentage = calculateDeviationPercentage;
const checkMalfunctioningSensor = (sensor, sensors) => {
    const { face, temperatures } = sensor;
    const avgTemperature = temperatures.reduce((sum, temp) => sum + temp.temperature, 0) /
        temperatures.length;
    const sensorsFacingSameSide = sensors.filter((s) => s.face === face && s.id !== sensor.id);
    const avgTemperatureOfOtherSensors = sensorsFacingSameSide.reduce((sum, s) => sum +
        s.temperatures.reduce((tempSum, temp) => tempSum + temp.temperature, 0) /
            s.temperatures.length, 0);
    const avgTemperatureOfOtherSensorsNormalized = avgTemperatureOfOtherSensors / sensorsFacingSameSide.length;
    const deviationPercentage = (Math.abs(avgTemperature - avgTemperatureOfOtherSensorsNormalized) /
        avgTemperatureOfOtherSensorsNormalized) *
        100;
    if (deviationPercentage > 20) {
        console.log(`Malfunctioning sensor detected: Sensor ID ${sensor.id}, Average Temperature: ${avgTemperature}`);
    }
};
exports.checkMalfunctioningSensor = checkMalfunctioningSensor;
const addSensorData = (data, sensors) => {
    const { id, face, temperature, timestamp } = data;
    const sensor = sensors.find((s) => s.id === id && s.face === face);
    if (!sensor) {
        const newSensor = {
            id,
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
const removeSensorById = (id, sensors) => {
    console.log(id);
    const index = sensors.findIndex((sensor) => sensor.id === id);
    if (index !== -1) {
        return sensors.splice(index, 1)[0];
    }
    return undefined;
};
exports.removeSensorById = removeSensorById;
const multyFunctinalSensor = (sensors) => {
    return sensors.filter((sensor) => {
        const { face, temperatures } = sensor;
        const avgTemperature = temperatures.reduce((sum, temp) => sum + temp.temperature, 0) /
            temperatures.length;
        const sensorsFacingSameSide = sensors.filter((s) => s.face === face && s.id !== sensor.id);
        const avgTemperatureOfOtherSensors = sensorsFacingSameSide.reduce((sum, s) => sum +
            s.temperatures.reduce((tempSum, temp) => tempSum + temp.temperature, 0) /
                s.temperatures.length, 0);
        const avgTemperatureOfOtherSensorsNormalized = avgTemperatureOfOtherSensors / sensorsFacingSameSide.length;
        const deviationPercentage = (Math.abs(avgTemperature - avgTemperatureOfOtherSensorsNormalized) /
            avgTemperatureOfOtherSensorsNormalized) *
            100;
        return deviationPercentage > 20;
    });
};
exports.multyFunctinalSensor = multyFunctinalSensor;
const generateRandomSensors = (numberOfSensors) => {
    const sensors = [];
    const faces = [types_1.Face.North, types_1.Face.East, types_1.Face.South, types_1.Face.West];
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    for (let i = 1; i <= numberOfSensors; i++) {
        const randomFace = faces[Math.floor(Math.random() * faces.length)];
        const randomTemperature = (0, exports.getRandomTemperature)();
        const randomTimestamp = Date.now() - Math.floor(Math.random() * 30 * millisecondsInADay);
        const newSensor = {
            id: generateTimestampUUID() + 1,
            face: randomFace,
            temperatures: [
                { temperature: randomTemperature, timestamp: randomTimestamp },
            ],
        };
        sensors.push(newSensor);
    }
    return sensors;
};
exports.generateRandomSensors = generateRandomSensors;
const removeInactiveSensors = (sensors) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const inactiveThreshold = currentTimestamp - 24 * 60 * 60;
    const activeSensors = [];
    sensors.forEach((sensor) => {
        var _a;
        const lastTimestamp = ((_a = sensor.temperatures[sensor.temperatures.length - 1]) === null || _a === void 0 ? void 0 : _a.timestamp) || 0;
        if (lastTimestamp >= inactiveThreshold) {
            activeSensors.push(sensor);
        }
        else {
            console.log(`Sensor removed: Sensor ID ${sensor.id}`);
        }
    });
    sensors.length = 0;
    sensors.push(...activeSensors);
};
exports.removeInactiveSensors = removeInactiveSensors;
function generateTimestampUUID() {
    const hexDigits = '0123456789abcdef';
    let uuid = '';
    const timestamp = new Date().getTime().toString(16); // Get the current timestamp in hexadecimal
    for (let i = 0; i < 12; i++) {
        if (i === 8) {
            uuid += '-';
        }
        else {
            uuid += hexDigits[Math.floor(Math.random() * 16)];
        }
    }
    uuid += '-' + timestamp;
    return uuid;
}
exports.generateTimestampUUID = generateTimestampUUID;
