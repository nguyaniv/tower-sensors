const logAggregatedTemperatures = async () => {
  try {
    const response = await fetch('api/aggregated-temperature');
    if (!response.ok) {
      throw new Error('Failed to fetch aggregated temperatures');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const logMalfunctioningSensors = async () => {
  try {
    const response = await fetch('/api/mulfunctioning-sensors');
    if (!response.ok) {
      throw new Error('Failed to fetch malfunctioning sensors');
    }
    const data = await response.json();
    console.log('Number of malfunctioning sensors', data.length);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const formatTemperature = (temperature) => {
  if (typeof temperature === 'number') {
    return `${temperature.toFixed(2)}°C`;
  } else {
    return 'N/A';
  }
};

const faces = ['North', 'East', 'South', 'West'];
const dayTime = 24 * 60 * 60 * 1000;

const getRandomTemperature = () => {
  return Math.random() * 50;
};
const addSensor = async () => {
  try {
    const res = await fetch('api/sensors');
    const data = await res.json();
    let lengthOfSensors = data.length;
    console.log('length of sensors: ', lengthOfSensors);
    const randomFace = faces[Math.floor(Math.random() * faces.length)];
    const randomTemperature = getRandomTemperature();
    const randomTimestamp =
      Date.now() - Math.floor(Math.random() * 30 * dayTime);
    const newSensorData = {
      id: ++lengthOfSensors,
      face: randomFace,
      temperature: randomTemperature,
      timestamp: randomTimestamp,
    };
    const response = await fetch('api/sensor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSensorData),
    });
    if (!response.ok) {
      throw new Error('Failed to add sensor.');
    }
    console.log('Sensor added successfully.');
    logAggregatedTemperatures();
  } catch (error) {
    console.error(error);
  }
};

const logAllSensors = async () => {
  const res = await fetch('api/sensors');
  const data = await res.json();

  console.log(data);
};

const removeSensor = async () => {
  const idE = document.querySelector('.remove-sensor-input');
  try {
    const response = await fetch('api/sensor', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: idE.value }),
    });
    if (!response.ok) {
      throw new Error('Failed to remove sensor.');
    }
    console.log('Sensor removed successfully.');
  } catch (error) {
    console.error(error);
  }
};
