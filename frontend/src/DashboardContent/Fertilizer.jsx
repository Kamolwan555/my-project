import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CircularProgress, 
  Grid, 
  Typography, 
  Chip 
} from '@mui/material';
import { 
  AccessTime, 
  PlayCircleOutline, 
  CheckCircleOutline, 
  Dashboard 
} from '@mui/icons-material';

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
    <div style={{ padding: 24 }}>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3}>
          {sensorData.map((sensor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sensor.id}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              >
                <CardHeader
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <Dashboard style={{ color: 'white' }} />
                      <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                        ออร์เดอร์ที่ {sensor.order}
                      </Typography>
                    </div>
                  }
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.light,
                    color: 'black',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    '& .MuiCardHeader-content': {
                      display: 'flex',
                      justifyContent: 'center'
                    }
                  }}
                />
                <CardContent>
                  <Chip
                    icon={<AccessTime />}
                    label={`จำนวนวัน: ${sensor.daysf}`}
                    variant="outlined"
                    sx={{ mb: 2, color: '#1976d2', borderColor: '#1976d2' }}
                  />

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        <PlayCircleOutline fontSize="small" /> เริ่มต้น
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
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
                        style={{ fontWeight: 'bold' }}
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="caption" color="textSecondary">
                    รหัสเซ็นเซอร์: {sensor.id}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default SensorCard;