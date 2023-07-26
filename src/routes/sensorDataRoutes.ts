import express from 'express';
import { addSensorData } from '../controllers/sensorController';

const router = express.Router();

router.post('/sensor-data', addSensorData);

export default router;
