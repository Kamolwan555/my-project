import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CircularProgress, 
  Grid, 
  Typography, 
  Chip,
  Divider,
  Box
} from '@mui/material';
import { 
  AccessTime, 
  PlayCircleOutline, 
  CheckCircleOutline,
  ChevronRight
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SensorCard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sensor');
        setSensorData(response.data.ssr);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'error': return 'error';
      default: return 'primary';
    }
  };

  return (
    <Box sx={{ padding: 4, minHeight: '100vh' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {sensorData.map((sensor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sensor.id}>
              <Card 
                component={Link}
                to={`/customerfer?orderId=${sensor.order}`}
                sx={{ 
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' },
                  textDecoration: 'none',
                  backgroundColor: '#ffffff',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'black' }}> 
                        ออร์เดอร์ที่ {sensor.order}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    backgroundColor: '#f1ffe5', 
                    color: 'black',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    py: 3,
                    '& .MuiCardHeader-content': {
                      display: 'flex',
                      justifyContent: 'center'
                    }
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    icon={<AccessTime />}
                    label={`จำนวนวัน: ${sensor.daysf}`}
                    variant="outlined"
                    sx={{ mb: 2, color: '#38b000', borderColor: '#38b000' }} 
                  />

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        <PlayCircleOutline fontSize="small" /> เริ่มต้น
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        {sensor.start}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        <CheckCircleOutline fontSize="small" /> สถานะ
                      </Typography>
                      <Chip
                        label={sensor.status.toUpperCase()}
                        color={getStatusColor(sensor.status)}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="caption" color="textSecondary">
                    รหัสเซ็นเซอร์: {sensor.id}
                  </Typography>
                </CardContent>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
                  <Typography variant="body2" sx={{ color: '#black', mr: 1 }}> 
                    ดูรายละเอียด
                  </Typography>
                  <ChevronRight sx={{ color: '#black' }} /> 
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SensorCard;