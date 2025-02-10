// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get('/cal/api/fertilizer.php?cropID=17&N=สูง&P=ต่ำ&K=ปานกลาง')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Data</h1>
//       {error && <p>Error: {error.message}</p>}
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default App;
// function Recommend() {
//   return (
//       <div>
//           <h2>This is Calculate Page.</h2>
//       </div>
//   );
// }

// export default Recommend;
// import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Calculate = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cropID, N, P, K } = useParams();

  useEffect(() => {
    if (cropID && N && P && K) {
      axios.get(`/cal/api/fertilizer.php?cropID=${cropID}&N=${N}&P=${P}&K=${K}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [cropID, N, P, K]);

  if (loading) {
    return (
      <Container maxWidth={false} style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" color="primary">กำลังโหลดข้อมูล...</Typography>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth={false} style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">ไม่สามารถดึงข้อมูลได้</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom color="black">
        ผลการวิเคราะห์การใช้ปุ๋ย
      </Typography>
      <Typography variant="h5" align="center" gutterBottom color="black">
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

      <Paper elevation={4} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#ede7f6' }}>
        <Typography variant="h6" color="black">คำแนะนำการใช้ปุ๋ย</Typography>
        <Box style={{ paddingLeft: '15px', borderLeft: '4px solid black' }}>
          <div dangerouslySetInnerHTML={{ __html: data.note1 }} />
          <div dangerouslySetInnerHTML={{ __html: data.note2 }} />
          <div dangerouslySetInnerHTML={{ __html: data.note3 }} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Calculate;

