import express from 'express';
import { getAggregatedTemperatures } from '../controllers/temperatureController';

const router = express.Router();

router.get('/aggregated-temperature', getAggregatedTemperatures);

export default router;
