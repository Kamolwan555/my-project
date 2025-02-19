import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  MenuItem,
  Button,
  FormControl,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#38b000", 
    },
  },
  typography: {
    fontFamily: "Sarabun, sans-serif",
  },
});

const cropData = [
  { id: "75", name: "ไม่ระบุพืช" },
  { id: "72", name: "กระเทียม หอมแดง และหอมหัวใหญ่" },
  { id: "9", name: "ข้าวนาปรัง/ข้าวไม่ไวแสง" },
  { id: "10", name: "ข้าวนาปี/ข้าวไวแสง" },
  { id: "70", name: "ข้าวโพดฝักสด" },
  { id: "71", name: "ข้าวโพดเลี้ยงสัตว์" },
  { id: "65", name: "คะน้า ผักกาดหัว กะหล่ำปลี" },
  { id: "52", name: "เงาะ" },
  { id: "17", name: "ทุเรียน" },
  { id: "19", name: "ปาล์มน้ำมัน" },
  { id: "22", name: "พริก มะเขือ มะเขือเทศ" },
  { id: "13", name: "พืชตระกูลถั่ว (ใช้ปุ๋ยชีวภาพ)" },
  { id: "12", name: "พืชตระกูลถั่ว (ไม่ใช้ปุ๋ยชีวภาพ)" },
  { id: "63", name: "มะพร้าว" },
  { id: "26", name: "มะม่วง" },
  { id: "54", name: "มังคุด" },
  { id: "64", name: "มันฝรั่ง มันเทศ เผือก" },
  { id: "27", name: "มันสำปะหลัง" },
  { id: "38", name: "ยางพารา" },
  { id: "57", name: "ลำไย" },
  { id: "58", name: "ลิ้นจี่" },
  { id: "77", name: "ส้ม" },
  { id: "36", name: "สับปะรด" },
  { id: "62", name: "หน่อไม้ฝรั่ง" },
  { id: "68", name: "อ้อยตอ" },
  { id: "69", name: "อ้อยปลูก" },
];

const CropSelector = () => {
  const navigate = useNavigate();
  const [cropID, setCropID] = useState("");
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cropID || !N || !P || !K) {
      alert("กรุณาเลือกข้อมูลให้ครบทุกช่อง");
      return;
    }
    navigate(`/calculate/${cropID}/${N}/${P}/${K}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Header Container */}

        {/* Form Container */}
        <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="p">
              เลือกพืชและค่าธาตุอาหาร
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Crop Selector */}
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="เลือกพืช"
                  value={cropID}
                  onChange={(e) => setCropID(e.target.value)}
                  variant="outlined"
                  required
                >
                  {cropData.map((crop) => (
                    <MenuItem key={crop.id} value={crop.id}>
                      {crop.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Box>

            {/* Nutrient Inputs */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {[
                { label: "ไนโตรเจน (N)", value: N, setter: setN },
                { label: "ฟอสฟอรัส (P)", value: P, setter: setP },
                { label: "โพแทสเซียม (K)", value: K, setter: setK },
              ].map((item, index) => (
                <Grid item xs={12} key={index}>
                  <FormControl fullWidth>
                    <TextField
                      select
                      label={item.label}
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      variant="outlined"
                      required
                    >
                      <MenuItem value="ต่ำมาก">ต่ำมาก</MenuItem>
                      <MenuItem value="ต่ำ">ต่ำ</MenuItem>
                      <MenuItem value="ปานกลาง">ปานกลาง</MenuItem>
                      <MenuItem value="สูง">สูง</MenuItem>
                      <MenuItem value="สูงมาก">สูงมาก</MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
              ))}
            </Grid>

            {/* Submit Button */}
            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "#38b000",
                  "&:hover": { backgroundColor: "#2c8c00" },
                }}
              >
                คำนวณปุ๋ย
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CropSelector;