import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DataCard = ({ title, current, unit }) => {
  return (
    <Card sx={{
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: "background.paper",
      transition: 'transform 0.2s',
      '&:hover': { transform: 'scale(1.02)' },
      background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
      border: '1px solid #e0e0e0',
      marginBottom: 2,
    }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: 'primary.main' }}>
          {current.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

const soilData = [
  { soil_temperature: 21.100, soil_moisture: 43.00, ec: 4.54, ph: 6,   nitrogen: 20, potassium: 75, phosphorus: 38 },
  { soil_temperature: 22.020, soil_moisture: 50.00, ec: 4.10, ph: 6.2, nitrogen: 25, potassium: 70, phosphorus: 40 },
  { soil_temperature: 23.480, soil_moisture: 47.00, ec: 3.95, ph: 6.4, nitrogen: 20, potassium: 72, phosphorus: 42 },
  { soil_temperature: 19.850, soil_moisture: 60.00, ec: 3.80, ph: 6.5, nitrogen: 25, potassium: 68, phosphorus: 45 },
  { soil_temperature: 24.570, soil_moisture: 55.00, ec: 3.60, ph: 6.3, nitrogen: 20, potassium: 77, phosphorus: 39 },
  { soil_temperature: 21.100, soil_moisture: 52.00, ec: 4.20, ph: 6.1, nitrogen: 20, potassium: 73, phosphorus: 41 },
  { soil_temperature: 20.210, soil_moisture: 55.00, ec: 4.00, ph: 6.6, nitrogen: 28, potassium: 69, phosphorus: 43 },
  { soil_temperature: 19.540, soil_moisture: 58.00, ec: 3.95, ph: 6.7, nitrogen: 27, potassium: 74, phosphorus: 44 },
  { soil_temperature: 22.450, soil_moisture: 48.00, ec: 4.05, ph: 6.2, nitrogen: 25, potassium: 70, phosphorus: 40 },
  { soil_temperature: 20.320, soil_moisture: 53.00, ec: 3.90, ph: 6.0, nitrogen: 20, potassium: 76, phosphorus: 37 },
  { soil_temperature: 20.200, soil_moisture: 53.00, ec: 3.90, ph: 6.0, nitrogen: 20, potassium: 76, phosphorus: 37 },
];

export default function App() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("กรุณาล็อกอินก่อน");
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/sensors`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const res = await response.json();
        setData(res);
        soilData.push(res);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        toast.error("ไม่สามารถโหลดข้อมูลได้");
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">กำลังโหลดข้อมูล...</Typography>
      </Box>
    );
  }

  // ใช้ข้อมูลล่าสุดจาก data
  const latestData = {
    nitrogen: data.nitrogen,
    phosphorus: data.phosphorus,
    potassium: data.potassium,
    soil_temperature: data.soil_temperature,
    ec: data.ec,
    ph: data.ph,
  };

  const currentData = [
    { title: "ไนโตรเจน", current: latestData.nitrogen, unit: "mg/kg" },
    { title: "ฟอสฟอรัส", current: latestData.phosphorus, unit: "mg/kg" },
    { title: "โพแทสเซียม", current: latestData.potassium, unit: "mg/kg" },
    { title: "อุณหภูมิดิน", current: latestData.soil_temperature, unit: "°C" },
    { title: "ค่าการนำไฟฟ้า", current: latestData.ec, unit: "dS/m" },
    { title: "ค่า pH", current: latestData.ph, unit: "" },
  ];

  // กราฟสำหรับไนโตรเจน (N)
  const nitrogenChartData = {
    labels: soilData.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "ไนโตรเจน (N) mg/kg",
        data: soilData.map((item) => item.nitrogen),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  // กราฟสำหรับฟอสฟอรัส (P)
  const phosphorusChartData = {
    labels: soilData.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "ฟอสฟอรัส (P) mg/kg",
        data: soilData.map((item) => item.phosphorus),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  // กราฟสำหรับโพแทสเซียม (K)
  const potassiumChartData = {
    labels: soilData.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "โพแทสเซียม (K) mg/kg",
        data: soilData.map((item) => item.potassium),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "ข้อมูลไนโตรเจน, ฟอสฟอรัส, และโพแทสเซียม ตามเวลา",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ThemeProvider theme={createTheme({
      typography: {
        fontFamily: "'Sarabun', sans-serif",
        h6: { fontWeight: 700 },
        body1: { fontWeight: 400 },
        button: { fontWeight: 500 },
      },
      palette: {
        primary: { main: "#38b000" },
        secondary: { main: "#ff6f61" },
        error: { main: "#ff1744" },
        background: {
          default: "#f5f5f5",
          paper: "#ffffff",
        },
      },
    })}>
      <Box sx={{ p: 2, marginTop: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(56, 176, 0, 0.1)",
              boxShadow: '0px 4px 10px rgba(56, 176, 0, 0.2)',
            },
            padding: '10px 20px',
            borderRadius: '8px'
          }}
        >
          ย้อนกลับ
        </Button>

        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            ข้อมูลปัจจุบัน
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {currentData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <DataCard
                  title={item.title}
                  current={item.current}
                  unit={item.unit}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            กราฟไนโตรเจน (N)
          </Typography>
          <Line data={nitrogenChartData} options={chartOptions} />

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            กราฟฟอสฟอรัส (P)
          </Typography>
          <Line data={phosphorusChartData} options={chartOptions} />

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            กราฟโพแทสเซียม (K)
          </Typography>
          <Line data={potassiumChartData} options={chartOptions} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
