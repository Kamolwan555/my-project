// import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans Thai, serif',
  },
});

export default function MediaCard() {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            มะเขือ (sensor-1)
          </Typography>
          <Grid container spacing={0.5}>
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

        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size='medium'>
            <ChevronRightIcon />
          </IconButton>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
