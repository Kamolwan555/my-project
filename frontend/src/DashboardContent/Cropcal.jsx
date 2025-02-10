import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, MenuItem, Select, Button, FormControl, InputLabel, Box } from "@mui/material";

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
  { id: "69", name: "อ้อยปลูก" }
];

const CropSelector = () => {
  const navigate = useNavigate();
  const [cropID, setCropID] = useState("");
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");

  const handleSubmit = () => {
    if (!cropID || !N || !P || !K) {
      alert("กรุณาเลือกข้อมูลให้ครบทุกช่อง");
      return;
    }
    navigate(`/calculate/${cropID}/${N}/${P}/${K}`);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        เลือกพืชและค่าธาตุอาหาร
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel shrink>เลือกพืช</InputLabel>
          <Select value={cropID} onChange={(e) => setCropID(e.target.value)} notched>
            {cropData.map((crop) => (
              <MenuItem key={crop.id} value={crop.id}>
                {crop.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {[{ label: "ไนโตรเจน (N)", value: N, setter: setN },
          { label: "ฟอสฟอรัส (P)", value: P, setter: setP },
          { label: "โพแทสเซียม (K)", value: K, setter: setK }].map((item, index) => (
          <FormControl fullWidth key={index}>
            <InputLabel shrink>{item.label}</InputLabel>
            <Select value={item.value} onChange={(e) => item.setter(e.target.value)} notched>
              <MenuItem value="ต่ำ">ต่ำ</MenuItem>
              <MenuItem value="ปานกลาง">ปานกลาง</MenuItem>
              <MenuItem value="สูง">สูง</MenuItem>
            </Select>
          </FormControl>
        ))}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          คำนวณปุ๋ย
        </Button>
      </Box>
    </Container>
  );
};

export default CropSelector;
