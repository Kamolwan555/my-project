import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Button onClick={handleBack} style={{ marginBottom: '20px' }}>ย้อนกลับ</Button>
      
      <Typography variant="h4" align="center" gutterBottom>ข้อมูลการสั่งซื้อปุ๋ย</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">ปุ๋ย 1</Typography>
            <Typography>ชื่อปุ๋ย: <strong>{fert1.name}</strong></Typography>
            <Typography>ปริมาณ: <strong>{fert1.amount}</strong> {fert1.unit}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">ปุ๋ย 2</Typography>
            <Typography>ชื่อปุ๋ย: <strong>{fert2.name}</strong></Typography>
            <Typography>ปริมาณ: <strong>{fert2.amount}</strong> {fert2.unit}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">ปุ๋ย 3</Typography>
            <Typography>ชื่อปุ๋ย: <strong>{fert3.name}</strong></Typography>
            <Typography>ปริมาณ: <strong>{fert3.amount}</strong> {fert3.unit}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        ยืนยันการสั่งซื้อ
      </Button>
    </Container>
  );
};

export default OrderFertilizer;
