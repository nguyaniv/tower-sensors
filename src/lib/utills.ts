import { Face, Sensor, SensorData } from '../types';

export const getRandomTemperature = () => {
  return Math.random() * 10 * 5;
};

export function calculateAverageTemperature(temperatures: number[]): number {
  return (
    temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
  );
}

export function calculateDeviationPercentage(
  value: number,
  reference: number
): number {
  return (Math.abs(value - reference) / reference) * 100;
}

export const checkMalfunctioningSensor = (
  sensor: Sensor,
  sensors: Sensor[]
) => {
  const { face, temperatures } = sensor;
  const avgTemperature =
    temperatures.reduce((sum, temp) => sum + temp.temperature, 0) /
    temperatures.length;

  const sensorsFacingSameSide = sensors.filter(
    (s) => s.face === face && s.id !== sensor.id
  );
  const avgTemperatureOfOtherSensors = sensorsFacingSameSide.reduce(
    (sum, s) =>
      sum +
      s.temperatures.reduce((tempSum, temp) => tempSum + temp.temperature, 0) /
        s.temperatures.length,
    0
  );
  const avgTemperatureOfOtherSensorsNormalized =
    avgTemperatureOfOtherSensors / sensorsFacingSameSide.length;

  const deviationPercentage =
    (Math.abs(avgTemperature - avgTemperatureOfOtherSensorsNormalized) /
      avgTemperatureOfOtherSensorsNormalized) *
    100;

  if (deviationPercentage > 20) {
    console.log(
      `Malfunctioning sensor detected: Sensor ID ${sensor.id}, Average Temperature: ${avgTemperature}`
    );
  }
};

export const addSensorData = (
  data: SensorData,
  sensors: Sensor[]
): Sensor | undefined => {
  const { id, face, temperature, timestamp } = data;
  const sensor = sensors.find((s) => s.id === id && s.face === face);

  if (!sensor) {
    const newSensor: Sensor = {
      id,
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

export const removeSensorById = (
  id: string,
  sensors: Sensor[]
): Sensor | undefined => {
  console.log(id);
  const index = sensors.findIndex((sensor: Sensor) => sensor.id === id);
  if (index !== -1) {
    return sensors.splice(index, 1)[0];
  }
  return undefined;
};

export const multyFunctinalSensor = (sensors: Sensor[]) => {
  return sensors.filter((sensor) => {
    const { face, temperatures } = sensor;
    const avgTemperature =
      temperatures.reduce((sum, temp) => sum + temp.temperature, 0) /
      temperatures.length;

    const sensorsFacingSameSide = sensors.filter(
      (s) => s.face === face && s.id !== sensor.id
    );
    const avgTemperatureOfOtherSensors = sensorsFacingSameSide.reduce(
      (sum, s) =>
        sum +
        s.temperatures.reduce(
          (tempSum, temp) => tempSum + temp.temperature,
          0
        ) /
          s.temperatures.length,
      0
    );
    const avgTemperatureOfOtherSensorsNormalized =
      avgTemperatureOfOtherSensors / sensorsFacingSameSide.length;

    const deviationPercentage =
      (Math.abs(avgTemperature - avgTemperatureOfOtherSensorsNormalized) /
        avgTemperatureOfOtherSensorsNormalized) *
      100;

    return deviationPercentage > 20;
  });
};

export const generateRandomSensors = (numberOfSensors: number) => {
  const sensors = [];
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

  return sensors;
};

export const removeInactiveSensors = (sensors: Sensor[]) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const inactiveThreshold = currentTimestamp - 24 * 60 * 60;

  const activeSensors: Sensor[] = [];
  sensors.forEach((sensor) => {
    const lastTimestamp =
      sensor.temperatures[sensor.temperatures.length - 1]?.timestamp || 0;
    if (lastTimestamp >= inactiveThreshold) {
      activeSensors.push(sensor);
    } else {
      console.log(`Sensor removed: Sensor ID ${sensor.id}`);
    }
  });

  sensors.length = 0;
  sensors.push(...activeSensors);
};

export function generateTimestampUUID() {
  const hexDigits = '0123456789abcdef';
  let uuid = '';
  const timestamp = new Date().getTime().toString(16); // Get the current timestamp in hexadecimal
  for (let i = 0; i < 12; i++) {
    if (i === 8) {
      uuid += '-';
    } else {
      uuid += hexDigits[Math.floor(Math.random() * 16)];
    }
  }
  uuid += '-' + timestamp;
  return uuid;
}
