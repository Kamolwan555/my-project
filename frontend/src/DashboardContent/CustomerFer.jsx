import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Alert, Button, Grid } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts"; // เพิ่ม LineChart
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ข้อมูลตัวอย่าง
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
  },
});

// ข้อมูลสำหรับ Bar Chart
const chartData = [
  { name: "ไนโตรเจน", now: nowData.nitrogen, final: finalData.nitrogen },
  { name: "ฟอสฟอรัส", now: nowData.phosphorus, final: finalData.phosphorus },
  { name: "โพแทสเซียม", now: nowData.potassium, final: finalData.potassium },
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
      <Typography variant="body2">สุดท้าย: {thisData.final}</Typography>
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

// Alert Component
function SurveyAlertItem({ id, title }) {
  return (
    <Alert
      severity="warning"
      variant="outlined"
      sx={{ 
        mb: 2, 
        alignItems: 'center',
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
            "&:hover": { backgroundColor: "rgba(56, 176, 0, 0.1)" },
          }}
        >
          ย้อนกลับ
        </Button>

        <Box sx={{ p: 2 }}>
          {/* Cards สำหรับแสดงค่าปัจจุบัน */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            ข้อมูลปัจจุบัน
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { title: "ไนโตรเจน", value: finalData.nitrogen, bgcolor: '#FFCCCC' },
              { title: "ฟอสฟอรัส", value: finalData.phosphorus, bgcolor: '#CCFFCC' },
              { title: "โพแทสเซียม", value: finalData.potassium, bgcolor: '#CCCCFF' },
              { title: "อุณหภูมิดิน", value: finalData.soil_temperature, bgcolor: '#FFFFCC' },
              { title: "ค่าการนำไฟฟ้า", value: finalData.ec, bgcolor: '#FFCCFF' },
              { title: "ค่า pH", value: finalData.ph, bgcolor: '#CCFFFF' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: 2, boxShadow: 2, bgcolor: item.bgcolor }}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      {item.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            {/* Bar Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    เปรียบเทียบสารอาหารในดิน
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <BarChart
                      dataset={chartData}
                      xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                      series={[
                        { dataKey: 'now', label: 'ปัจจุบัน' },
                        { dataKey: 'final', label: 'สุดท้าย' },
                      ]}
                      height={300}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Line Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    แนวโน้มอุณหภูมิและความชื้นในดิน
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <LineChart
                      dataset={lineChartData}
                      xAxis={[{ scaleType: 'band', dataKey: 'time' }]}
                      series={[
                        { dataKey: 'temperature', label: 'อุณหภูมิ' },
                        { dataKey: 'moisture', label: 'ความชื้น' },
                      ]}
                      height={300}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Alert Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
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