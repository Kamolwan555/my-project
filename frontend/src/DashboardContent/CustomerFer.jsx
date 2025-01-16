import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert
} from '@mui/material';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

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

const nowData = soilData[0];
const finalData = soilData[soilData.length - 1];

// เตรียมข้อมูล 3 รายการ: N, P, K
const chartData = [
  {
    name: 'Nitrogen',
    now: nowData.nitrogen,
    final: finalData.nitrogen,
  },
  {
    name: 'Phosphorus',
    now: nowData.phosphorus,
    final: finalData.phosphorus,
  },
  {
    name: 'Potassium',
    now: nowData.potassium,
    final: finalData.potassium,
  },
];

// สร้าง Tooltip แบบกำหนดเอง แสดง Now / Final
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const thisData = payload[0].payload;
  return (
    <Box sx={{ p: 1, bgcolor: 'white', boxShadow: 1, borderRadius: 1 }}>
      <Typography variant="body2" fontWeight="bold">{label}</Typography>
      <Typography variant="body2">Now: {thisData.now}</Typography>
      <Typography variant="body2">Final: {thisData.final}</Typography>
    </Box>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  payload: PropTypes.arrayOf(PropTypes.shape({
    payload: PropTypes.shape({
      now: PropTypes.number,
      final: PropTypes.number,
    }),
  })),
};

// คอมโพเนนต์ย่อย สำหรับแสดงแต่ละรายการ Alert/Survey (จะใช้เป็น Card หรือ Alert ก็ได้)
function SurveyAlertItem({ id, title }) {
  return (
    <Alert
      severity="info"
      variant="outlined"
      sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        #{id}
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {title}
      </Typography>
    </Alert>
  );
}

SurveyAlertItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default function App() {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >

      <Box sx={{ flex: 1 }}>
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Soil Data Dashboard
            </Typography>

            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip content={<CustomTooltip />} />

                  <Bar dataKey="now" stackId="stack" barSize={20}>
                    {chartData.map((entry) => {
                      let darkColor = '#1565C0'; // น้ำเงินเข้ม
                      if (entry.name === 'Phosphorus') {
                        darkColor = '#F9A825'; // เหลืองเข้ม
                      } else if (entry.name === 'Potassium') {
                        darkColor = '#388E3C'; // เขียวเข้ม
                      }
                      return <Cell key={`now-${entry.name}`} fill={darkColor} />;
                    })}
                  </Bar>

                  <Bar dataKey="final" stackId="stack" barSize={20}>
                    {chartData.map((entry) => {
                      let lightColor = '#90CAF9'; // น้ำเงินอ่อน
                      if (entry.name === 'Phosphorus') {
                        lightColor = '#FFF59D'; // เหลืองอ่อน
                      } else if (entry.name === 'Potassium') {
                        lightColor = '#C8E6C9'; // เขียวอ่อน
                      }
                      return <Cell key={`final-${entry.name}`} fill={lightColor} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ width: 320 }}>
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Alert
            </Typography>

            <SurveyAlertItem
              id="240622-002"
              title="Help us innovate"
              createdAt="11:24 PM"
              views={1123}
              comments={334}
            />
            <SurveyAlertItem
              id="240622-002"
              title="Help us innovate survey"
              createdAt="11:24 PM"
              views={1123}
              comments={334}
            />
            <SurveyAlertItem
              id="240622-002"
              title="Monthly goals"
              createdAt="11:24 PM"
              views={1123}
              comments={334}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
