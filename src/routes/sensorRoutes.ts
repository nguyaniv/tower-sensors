import express, { Request, Response } from 'express';
import { SensorData } from '../types';
import {
  addSensorData,
  removeSensorById,
  sensors,
} from '../controllers/sensorController';

const router = express.Router();

router.get('/sensors', (req: Request, res: Response) => {
  res.json(sensors);
});

router.post('/sensor', (req: Request, res: Response) => {
  const data: SensorData = req.body;
  const newSensor = addSensorData(data);
  res.json(newSensor);
});

router.delete('/sensor', (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(req.body);

  const removedSensor = removeSensorById(id);
  if (removedSensor) {
    console.log(`Sensor removed: Sensor ID ${removedSensor.id}`);
    res.json({ message: `Sensor removed: Sensor ID ${removedSensor.id}` });
  } else {
    res.status(404).json({ error: `Sensor with ID ${id} not found.` });
  }
});

export default router;
