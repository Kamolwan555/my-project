// import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';              // <== import Link มาจาก react-router-dom
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans Thai, serif',
  },
});

function MediaCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Order ID: 01 (sensor1)
        </Typography>
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              พืช
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              ข้าว
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              จำนวน
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              10 กระสอบ
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              หมักมาแล้ว
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              83 วัน
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              วันที่สั่ง
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              25 ตุลาคม 2567
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              วันที่เริ่มหมัก
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              26 ตุลาคม 2567
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      {/* ปุ่ม IconButton ที่จะลิ้งก์ไป /customer-fer */}
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton 
          component={Link}            // <== ใช้ Link แทนปุ่มธรรมดา
          to="/customerfer"          // <== path ไปยังหน้า CustomerFer
          size="medium"
        >
          <ChevronRightIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default function MediaCardList() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <MediaCard />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
