import { Request, Response } from 'express';
import { checkMalfunctioningSensor } from '../lib/utills';
import { sensors } from '../models/sensors';
import { SensorData } from '../types';
import { addSensorData } from './sensorController';

export const postSensorData = (req: Request, res: Response) => {
  const data: SensorData = req.body;
  const sensor = addSensorData(data);
  if (sensor) {
    checkMalfunctioningSensor(sensor, sensors);
  }
  res.sendStatus(200);
};
