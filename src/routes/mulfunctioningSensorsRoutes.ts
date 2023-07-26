import express from 'express';

import { getMulfunctioningSensors } from '../controllers/malfunctioningSensorsController';

const router = express.Router();

router.get('/mulfunctioning-sensors', getMulfunctioningSensors);

export default router;
