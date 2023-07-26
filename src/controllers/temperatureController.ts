import { Request, Response } from 'express';
import { Face, Sensor } from '../types';
import { sensors } from './sensorController';

export const getAggregatedTemperatures = (req: Request, res: Response) => {
  const aggregatedTemperatures: { [key in Face]: number } = {
    North: 0,
    East: 0,
    South: 0,
    West: 0,
  };

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const pastWeekTimestamp = currentTimestamp - 7 * 24 * 60 * 60;

  sensors.forEach((sensor: Sensor) => {
    const { face, temperatures } = sensor;
    const validTemperatures = temperatures.filter(
      (temp) => temp.timestamp >= pastWeekTimestamp
    );
    const sumTemperature = validTemperatures.reduce(
      (sum, temp) => sum + temp.temperature,
      0
    );
    const avgTemperature =
      validTemperatures.length > 0
        ? sumTemperature / validTemperatures.length
        : 0;
    aggregatedTemperatures[face] += avgTemperature;
  });
  console.log(
    'Aggregated hourly temperatures for the past week: ',
    aggregatedTemperatures
  );

  res.json(aggregatedTemperatures);
};
