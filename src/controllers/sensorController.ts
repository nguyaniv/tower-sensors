import { generateTimestampUUID, removeInactiveSensors } from '../lib/utills';
import { SensorData, Sensor, Face } from '../types';

let sensors: Sensor[] = [];
const numberOfSensors = 10000;

const addSensorData = (data: SensorData): Sensor | undefined => {
  const { id, face, temperature, timestamp } = data;
  const sensor = sensors.find((s) => s.id === id && s.face === face);

  if (!sensor) {
    const newSensor: Sensor = {
      id: generateTimestampUUID() + 1,
      face,
      temperatures: [{ temperature, timestamp }],
    };
    sensors.push(newSensor);
    console.log('new sensor: ', newSensor);

    return newSensor;
  } else {
    sensor.temperatures.push({ temperature, timestamp });
    return sensor;
  }
};

const removeSensorById = (id: string): Sensor | undefined => {
  console.log(id);
  const index = sensors.findIndex((sensor) => sensor.id === id);
  if (index !== -1) {
    return sensors.splice(index, 1)[0];
  }
  return undefined;
};

const generateRandomSensors = () => {
  sensors = [];
  const faces: Face[] = [Face.North, Face.East, Face.South, Face.West];
  const millisecondsInADay = 24 * 60 * 60 * 1000;

  for (let i = 1; i <= numberOfSensors; i++) {
    const randomFace = faces[Math.floor(Math.random() * faces.length)];
    const randomTemperature = getRandomTemperature();
    const randomTimestamp =
      Date.now() - Math.floor(Math.random() * 30 * millisecondsInADay);
    const newSensor: Sensor = {
      id: generateTimestampUUID() + 1,
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
setInterval(removeInactiveSensors, 60 * 60 * 1000);

export { addSensorData, removeSensorById, sensors };
