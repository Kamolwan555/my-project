import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const soilData = [
  { soil_temperature: 21, soil_moisture: 43, ec: 4.54, ph: 6, nitrogen: 90, potassium: 75, phosphorus: 38 },
  { soil_temperature: 20, soil_moisture: 56, ec: 3.88, ph: 6.9, nitrogen: 16, potassium: 71, phosphorus: 51 },
  { soil_temperature: 20, soil_moisture: 69, ec: 2.3, ph: 6.5, nitrogen: 43, potassium: 49, phosphorus: 37 },
  { soil_temperature: 28, soil_moisture: 46, ec: 7.26, ph: 7.3, nitrogen: 70, potassium: 50, phosphorus: 97 },
  { soil_temperature: 25, soil_moisture: 63, ec: 8.89, ph: 6.3, nitrogen: 58, potassium: 94, phosphorus: 57 },
  { soil_temperature: 25, soil_moisture: 43, ec: 4.21, ph: 6.8, nitrogen: 75, potassium: 88, phosphorus: 73 },
  { soil_temperature: 29, soil_moisture: 50, ec: 3.43, ph: 6.8, nitrogen: 8, potassium: 6, phosphorus: 2 },
  { soil_temperature: 28, soil_moisture: 34, ec: 4.4, ph: 7.9, nitrogen: 89, potassium: 5, phosphorus: 89 },
  { soil_temperature: 27, soil_moisture: 66, ec: 3.54, ph: 6.2, nitrogen: 81, potassium: 42, phosphorus: 7 },
  { soil_temperature: 26, soil_moisture: 42, ec: 9.63, ph: 7.1, nitrogen: 57, potassium: 73, phosphorus: 26 },
  { soil_temperature: 23, soil_moisture: 45, ec: 2.68, ph: 6.9, nitrogen: 26, potassium: 91, phosphorus: 42 },
  { soil_temperature: 26, soil_moisture: 34, ec: 7.89, ph: 6.4, nitrogen: 4, potassium: 54, phosphorus: 89 },
  { soil_temperature: 21, soil_moisture: 49, ec: 2.02, ph: 6.7, nitrogen: 3, potassium: 22, phosphorus: 79 },
  { soil_temperature: 28, soil_moisture: 73, ec: 7.87, ph: 6.2, nitrogen: 2, potassium: 23, phosphorus: 16 },
  { soil_temperature: 27, soil_moisture: 60, ec: 6.05, ph: 7.2, nitrogen: 50, potassium: 48, phosphorus: 43 },
  { soil_temperature: 24, soil_moisture: 47, ec: 9.88, ph: 6.4, nitrogen: 65, potassium: 52, phosphorus: 53 },
  { soil_temperature: 26, soil_moisture: 58, ec: 3.3, ph: 6.4, nitrogen: 32, potassium: 34, phosphorus: 32 },
  { soil_temperature: 27, soil_moisture: 45, ec: 5.01, ph: 6, nitrogen: 48, potassium: 89, phosphorus: 67 },
  { soil_temperature: 24, soil_moisture: 60, ec: 9.62, ph: 6.4, nitrogen: 50, potassium: 98, phosphorus: 65 },
];

const Fertilizer = () => {
    return (
        <div style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center' }}>Soil Data Dashboard</h1>
          <div style={{ height: '400px', marginTop: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Soil Metrics Overview</h2>
            <ResponsiveContainer>
              <BarChart data={soilData}>
                <XAxis dataKey="soil_temperature" label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Values', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="soil_moisture" fill="#82ca9d" name="Moisture (%)" />
                <Bar dataKey="ec" fill="#ff7300" name="EC" />
                <Bar dataKey="ph" fill="#8884d8" name="pH" />
                <Bar dataKey="nitrogen" fill="#d0ed57" name="Nitrogen (mg)" />
                <Bar dataKey="potassium" fill="#a4de6c" name="Potassium (mg)" />
                <Bar dataKey="phosphorus" fill="#ffc658" name="Phosphorus (mg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    };

export default Fertilizer;
