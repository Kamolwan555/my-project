import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans Thai, serif',
  },
});

const cardData = [
  {
    orderId: null,
    plant: null,
    quantity: null,
    daysFermented: null,
    orderDate: null,
    fermentationStartDate: null,
    status: 'ไม่มีออเดอร์',
  },
  {
    orderId: 2,
    plant: 'มะเขือ',
    quantity: '8 กระสอบ',
    daysFermented: '75 วัน',
    orderDate: '20 ตุลาคม 2567',
    fermentationStartDate: '21 ตุลาคม 2567',
    status: 'กำลังดำเนินการ',
  },
  {
    orderId: 3,
    plant: 'มันสำปะหลัง',
    quantity: '15 กระสอบ',
    daysFermented: '90 วัน',
    orderDate: '10 ตุลาคม 2567',
    fermentationStartDate: '11 ตุลาคม 2567',
    status: 'เสร็จสิ้น',
  },
  {
    orderId: null,
    plant: null,
    quantity: null,
    daysFermented: null,
    orderDate: null,
    fermentationStartDate: null,
    status: 'ไม่มีออเดอร์',
  },
  {
    orderId: 5,
    plant: 'อ้อย',
    quantity: '12 กระสอบ',
    daysFermented: '40 วัน',
    orderDate: '1 ธันวาคม 2567',
    fermentationStartDate: '2 ธันวาคม 2567',
    status: 'กำลังดำเนินการ',
  },
  {
    orderId: 6,
    plant: 'ข้าวโพด',
    quantity: '20 กระสอบ',
    daysFermented: '100 วัน',
    orderDate: '5 ตุลาคม 2567',
    fermentationStartDate: '6 ตุลาคม 2567',
    status: 'เสร็จสิ้น',
  },
  {
    orderId: null,
    plant: null,
    quantity: null,
    daysFermented: null,
    orderDate: null,
    fermentationStartDate: null,
    status: 'ไม่มีออเดอร์',
  },
  {
    orderId: 8,
    plant: 'พริก',
    quantity: '18 กระสอบ',
    daysFermented: '120 วัน',
    orderDate: '1 กันยายน 2567',
    fermentationStartDate: '2 กันยายน 2567',
    status: 'กำลังดำเนินการ',
  },
];

function MediaCard({ card }) {
  const getStatusColor = () => {
    if (!card.orderId) return 'green';
    if (card.status === 'กำลังดำเนินการ') return 'orange';
    if (card.status === 'เสร็จสิ้น') return 'red';
    return 'gray';
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
      {/* ใช้แถบสีซ้ายที่ยาวถึงแค่เส้นคั่น */}
      <div
        style={{
          width: 8,
          height: '100%',
          backgroundColor: getStatusColor(),
          marginRight: '8px',
        }}
      />

      <CardContent sx={{ paddingLeft: '16px' }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: 'center',
            color: getStatusColor(),
          }}
        >
          Order ID: {card.orderId ?? 'ว่าง'}
        </Typography>
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              พืช
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              {card.plant ?? 'ว่าง'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              จำนวน
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              {card.quantity ?? 'ว่าง'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              หมักมาแล้ว
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              {card.daysFermented ?? 'ว่าง'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              วันที่สั่ง
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              {card.orderDate ?? 'ว่าง'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              วันที่เริ่มหมัก
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              {card.fermentationStartDate ?? 'ว่าง'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              สถานะ
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'right',
                color: getStatusColor(),
                fontWeight: 'bold',
              }}
            >
              {card.status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      {/* Divider แบ่งข้อมูลกับปุ่ม */}
      <Divider sx={{ margin: '4px 0', borderColor: 'black' }} />

      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* เพิ่มข้อความ "รายละเอียด" ก่อนปุ่ม */}
        <Typography variant="body2" sx={{ mr: 1 }}>
          รายละเอียด
        </Typography>
        <IconButton
          component={Link}
          to={`/customerfer?orderId=${card.orderId ?? ''}`}
          size="medium"
        >
          <ChevronRightIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  card: PropTypes.shape({
    orderId: PropTypes.number,
    plant: PropTypes.string,
    quantity: PropTypes.string,
    daysFermented: PropTypes.string,
    orderDate: PropTypes.string,
    fermentationStartDate: PropTypes.string,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default function MediaCardList() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <MediaCard card={card} />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
