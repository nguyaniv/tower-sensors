import { Request, Response } from 'express';
import { multyFunctinalSensor } from '../lib/utills';
import { sensors } from '../models/sensors';

export const getMulfunctioningSensors = (req: Request, res: Response) => {
  const malfunctioningSensors = multyFunctinalSensor(sensors);
  const malfunctioningSensorData = malfunctioningSensors.map((sensor) => ({
    id: sensor.id,
    averageValue:
      sensor.temperatures.reduce((sum, temp) => sum + temp.temperature, 0) /
      sensor.temperatures.length,
  }));
  console.log(malfunctioningSensorData);

  res.json(malfunctioningSensorData);
};
