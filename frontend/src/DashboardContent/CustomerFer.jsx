import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Alert, Button, Grid } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ข้อมูลตัวอย่าง
const soilData = [
  { soil_temperature: 21, soil_moisture: 43, ec: 4.54, ph: 6, nitrogen: 90, potassium: 75, phosphorus: 38 },
  { soil_temperature: 20, soil_moisture: 56, ec: 3.88, ph: 6.9, nitrogen: 16, potassium: 71, phosphorus: 51 },
];

const nowData = soilData[0];
const previousData = soilData[1]; // ข้อมูลก่อนหน้า

// สร้างธีม
const theme = createTheme({
  typography: {
    fontFamily: "'Sarabun', sans-serif",
    h6: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500 },
  },
  palette: {
    primary: { main: "#38b000" }, // สีเขียว
    secondary: { main: "#ff6f61" }, // สีส้ม
    error: { main: "#ff1744" }, // สีแดงสำหรับข้อผิดพลาด
    background: {
      default: "#f5f5f5", // สีพื้นหลัง
      paper: "#ffffff", // สีพื้นหลังของ Card
    },
  },
});

// ข้อมูลสำหรับ Bar Chart
const chartData = [
  { name: "ไนโตรเจน", now: nowData.nitrogen, final: previousData.nitrogen },
  { name: "ฟอสฟอรัส", now: nowData.phosphorus, final: previousData.phosphorus },
  { name: "โพแทสเซียม", now: nowData.potassium, final: previousData.potassium },
];

// ข้อมูลสำหรับ Line Chart
const lineChartData = soilData.map((data, index) => ({
  time: index + 1,
  temperature: data.soil_temperature,
  moisture: data.soil_moisture,
}));

// Custom Tooltip สำหรับกราฟ
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const thisData = payload[0].payload;
  return (
    <Box sx={{ p: 1, bgcolor: 'white', boxShadow: 1, borderRadius: 1 }}>
      <Typography variant="body2" fontWeight="bold">{label}</Typography>
      <Typography variant="body2">ปัจจุบัน: {thisData.now}</Typography>
      <Typography variant="body2">ก่อนหน้า: {thisData.final}</Typography>
    </Box>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        now: PropTypes.number,
        final: PropTypes.number,
      }),
    })
  ),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// Alert Component
function SurveyAlertItem({ id, title }) {
  return (
    <Alert
      severity="warning"
      variant="outlined"
      sx={{ 
        mb: 2, 
        alignItems: 'center', 
        background: '#fff3e0', 
        borderColor: '#ffb74d',
        '& .MuiAlert-icon': { color: '#ff9800' }
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 1 }}>
        #{id}
      </Typography>
    </Alert>
  );
}

SurveyAlertItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

// การ์ดสำหรับแสดงข้อมูล
const DataCard = ({ title, current, previous, unit }) => {
  return (
    <Card sx={{ 
      borderRadius: 2, 
      boxShadow: 3, 
      bgcolor: "background.paper", 
      transition: 'transform 0.2s', 
      '&:hover': { transform: 'scale(1.02)' },
      background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
      border: '1px solid #e0e0e0'
    }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: theme.palette.primary.main }}>
          {current}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ก่อนหน้า: {previous} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  previous: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

// หน้าหลัก
export default function App() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // ย้อนกลับไปยังหน้าก่อนหน้า
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        {/* ปุ่มย้อนกลับ */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { 
              backgroundColor: "rgba(56, 176, 0, 0.1)",
              boxShadow: '0px 4px 10px rgba(56, 176, 0, 0.2)'
            },
            padding: '10px 20px',
            borderRadius: '8px'
          }}
        >
          ย้อนกลับ
        </Button>

        <Box sx={{ p: 2 }}>
          {/* Cards สำหรับแสดงค่าปัจจุบันและค่าก่อนหน้า */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            ข้อมูลปัจจุบันและข้อมูลก่อนหน้า
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { title: "ไนโตรเจน", current: nowData.nitrogen, previous: previousData.nitrogen, unit: "mg/kg" },
              { title: "ฟอสฟอรัส", current: nowData.phosphorus, previous: previousData.phosphorus, unit: "mg/kg" },
              { title: "โพแทสเซียม", current: nowData.potassium, previous: previousData.potassium, unit: "mg/kg" },
              { title: "อุณหภูมิดิน", current: nowData.soil_temperature, previous: previousData.soil_temperature, unit: "°C" },
              { title: "ค่าการนำไฟฟ้า", current: nowData.ec, previous: previousData.ec, unit: "dS/m" },
              { title: "ค่า pH", current: nowData.ph, previous: previousData.ph, unit: "" },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <DataCard
                  title={item.title}
                  current={item.current}
                  previous={item.previous}
                  unit={item.unit}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2}>
            {/* Bar Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 2, 
                boxShadow: 3, 
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                border: '1px solid #e0e0e0'
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    เปรียบเทียบสารอาหารในดิน
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <BarChart
                      dataset={chartData}
                      xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                      series={[
                        { dataKey: 'now', label: 'ปัจจุบัน', color: theme.palette.primary.main },
                        { dataKey: 'final', label: 'ก่อนหน้า', color: theme.palette.secondary.main },
                      ]}
                      height={300}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Line Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 2, 
                boxShadow: 3, 
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                border: '1px solid #e0e0e0'
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    แนวโน้มอุณหภูมิและความชื้นในดิน
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <LineChart
                      dataset={lineChartData}
                      xAxis={[{ scaleType: 'band', dataKey: 'time' }]}
                      series={[
                        { dataKey: 'temperature', label: 'อุณหภูมิ', color: theme.palette.primary.main },
                        { dataKey: 'moisture', label: 'ความชื้น', color: theme.palette.secondary.main },
                      ]}
                      height={300}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Alert Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                borderRadius: 2, 
                boxShadow: 3, 
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                border: '1px solid #e0e0e0'
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    การแจ้งเตือน
                  </Typography>
                  {[
                    { id: "240622-002", title: "ค่า pH ต่ำเกินไป" },
                    { id: "240622-003", title: "ความชื้นในดินต่ำ" },
                    { id: "240622-004", title: "ไนโตรเจนต่ำ" },
                    { id: "240622-005", title: "อุณหภูมิสูงเกินไป" },
                  ].map((alert, index) => (
                    <SurveyAlertItem key={index} id={alert.id} title={alert.title} />
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}