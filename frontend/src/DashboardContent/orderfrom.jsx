import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
// import { useState, useEffect } from 'react';

const OrderFertilizer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to parse the query params into an object
  const queryParams = new URLSearchParams(location.search);

  const fert1 = {
    name: queryParams.get('fert1'),
    amount: queryParams.get('amount1'),
    unit: queryParams.get('unit1'),
  };

  const fert2 = {
    name: queryParams.get('fert2'),
    amount: queryParams.get('amount2'),
    unit: queryParams.get('unit2'),
  };

  const fert3 = {
    name: queryParams.get('fert3'),
    amount: queryParams.get('amount3'),
    unit: queryParams.get('unit3'),
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleConfirm = () => {
    navigate('/fertilizer'); // Navigate to the fertilizer page
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Button onClick={handleBack} style={{ marginBottom: '20px' }}>ย้อนกลับ</Button>
      
      <Typography variant="h4" align="center" gutterBottom>ข้อมูลการสั่งซื้อปุ๋ย</Typography>

      <Grid container spacing={3} alignItems="stretch">
        {[fert1, fert2, fert3].map((fert, index) => (
          <Grid item xs={12} md={4} key={index} style={{ display: 'flex' }}>
            <Paper elevation={3} style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6">ปุ๋ย {index + 1}</Typography>
              <Typography>ชื่อปุ๋ย: <strong>{fert.name}</strong></Typography>
              <Typography>ปริมาณ: <strong>{fert.amount}</strong> {fert.unit}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleConfirm}>
        ยืนยันการสั่งซื้อ
      </Button>
    </Container>
  );
};

export default OrderFertilizer;
