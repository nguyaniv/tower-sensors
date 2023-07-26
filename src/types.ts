export type SensorData = {
  id: string;
  face: Face;
  temperature: number;
  timestamp: number; // Add the timestamp property
};

export interface TemperatureData {
  temperature: number;
  timestamp: number;
}

export enum Face {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
}

export type Sensor = {
  id: string;
  face: Face;
  temperatures: TemperatureData[];
};
