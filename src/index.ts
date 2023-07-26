import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import sensorRoutes from './routes/sensorRoutes';
import temperatureRoutes from './routes/temperatureRoutes';
import sensorDataRoutes from './routes/sensorDataRoutes';
import mulfunctioningSensorsRoutes from './routes/mulfunctioningSensorsRoutes';
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', sensorRoutes);
app.use('/api', temperatureRoutes);
app.use('/api', sensorDataRoutes);
app.use('/api', mulfunctioningSensorsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
