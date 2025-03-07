import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Calculate = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cropID, N, P, K } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cropID || !N || !P || !K) {
      setError(new Error('Missing parameters'));
      setLoading(false);
      return;
    }

    axios.get(`/cal/api/fertilizer.php?cropID=${cropID}&N=${N}&P=${P}&K=${K}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, [cropID, N, P, K]);

  if (loading) {
    return (
      <Container maxWidth={false} style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" color="primary">กำลังโหลดข้อมูล...</Typography>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container maxWidth={false} style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">ไม่สามารถดึงข้อมูลได้</Typography>
      </Container>
    );
  }

  const handleNext = () => {
    navigate(`/calorder?fert1=${data.fert1.name}&amount1=${data.fert1.result}&unit1=${data.fert1.unit}` +
             `&fert2=${data.fert2.name}&amount2=${data.fert2.result}&unit2=${data.fert2.unit}` +
             `&fert3=${data.fert3.name}&amount3=${data.fert3.result}&unit3=${data.fert3.unit}`);
  };

  return (
    <Container maxWidth={false} style={{ padding: '20px' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          color: '#38b000',
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(56, 176, 0, 0.1)',
          },
        }}
      >
        ย้อนกลับ
      </Button>

      <Typography variant="h4" align="center" gutterBottom color="black">
        ผลการวิเคราะห์การใช้ปุ๋ย
      </Typography>
      <Typography variant="h5" align="center" gutterBottom color="black" mb={4}>
        ชนิดพืช: {data.cropName}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={4} style={{ padding: '20px', backgroundColor: '#f3f4f6' }}>
            <Typography variant="h6" color="black">ผลวิเคราะห์</Typography>
            <Typography color="black">ไนโตรเจน (N): <strong>{data.N.amount} {data.N.unit}</strong> = {data.N.range}</Typography>
            <Typography color="black">ฟอสฟอรัส (P2O5): <strong>{data.P.amount} {data.P.unit}</strong> = {data.P.range}</Typography>
            <Typography color="black">โพแทสเซียม (K2O): <strong>{data.K.amount} {data.K.unit}</strong> = {data.K.range}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={4} style={{ padding: '20px', backgroundColor: '#e3f2fd' }}>
            <Typography variant="h6" color="black">ปริมาณธาตุอาหารที่พืชต้องการ</Typography>
            <Typography color="black">ไนโตรเจน (N): <strong>{data.N.result}</strong> กิโลกรัม/ไร่</Typography>
            <Typography color="black">ฟอสฟอรัส (P2O5): <strong>{data.P.result}</strong> กิโลกรัม/ไร่</Typography>
            <Typography color="black">โพแทสเซียม (K2O): <strong>{data.K.result}</strong> กิโลกรัม/ไร่</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={4} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#fff3e0' }}>
        <Typography variant="h6" color="black">ปริมาณปุ๋ยที่ต้องใช้</Typography>
        <Typography color="black">{data.fert1.name}: <strong>{data.fert1.result}</strong> {data.fert1.unit}</Typography>
        <Typography color="black">{data.fert2.name}: <strong>{data.fert2.result}</strong> {data.fert2.unit}</Typography>
        <Typography color="black">{data.fert3.name}: <strong>{data.fert3.result}</strong> {data.fert3.unit}</Typography>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        sx={{ display: 'block', margin: '20px auto', backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#e68900' } }}
      >
        ถัดไป
      </Button>
    </Container>
  );
};

export default Calculate;
