import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const SoilCard = () => {
  // ข้อมูลตัวอย่างของชุดดิน รวมถึงรูปภาพ
  const soilData = [
    {
      name: "ชุดดินที่ 1",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 1 เป็นดินทรายจัดที่เหมาะสำหรับการปลูกพืชไร่ เช่น อ้อย มันสำปะหลัง และพืชที่ทนต่อความแห้งแล้งได้ดี ข้อดีของชุดดินนี้คือการระบายน้ำได้ดี แต่ก็อาจจะต้องมีการรดน้ำบ่อย",
    },
    {
      name: "ชุดดินที่ 2",
      description: "ดินเหนียว เหมาะสำหรับการปลูกข้าวและพืชที่ต้องการน้ำมาก",
      province: "อยุธยา",
      image: "/images/Ayudhya.jpg",
      fullDescription:
        "ชุดดินที่ 2 เป็นดินเหนียวที่เหมาะสำหรับการปลูกข้าวและพืชที่ต้องการน้ำมาก เช่น ข้าวโพดและมันสำปะหลัง เนื่องจากดินเหนียวสามารถเก็บกักน้ำได้ดี",
    },
    {
      name: "ชุดดินที่ 3",
      description: "ดินร่วนปนทราย เหมาะสำหรับพืชสวน เช่น มะม่วง และลำไย",
      province: "เชียงใหม่",
      image: "/images/ChiangMai.jpg",
      fullDescription:
        "ชุดดินที่ 3 เป็นดินร่วนปนทรายที่เหมาะสำหรับพืชสวนเช่น มะม่วงและลำไย ดินประเภทนี้ช่วยให้รากพืชเจริญเติบโตได้ดี โดยไม่ท่วมขังน้ำ",
    },
    {
      name: "ชุดดินที่ 4",
      description: "ดินร่วน เหมาะสำหรับพืชไร่ และสวนผลไม้ เช่น ทุเรียน",
      province: "เชียงราย",
      image: "/images/ChiangRai.jpg",
      fullDescription:
        "ชุดดินที่ 4 เป็นดินร่วนที่มีความอุดมสมบูรณ์สูง เหมาะสำหรับการปลูกพืชไร่และสวนผลไม้ เช่น ทุเรียน ข้อดีของดินประเภทนี้คือมีการระบายน้ำได้ดี",
    },
    {
      name: "ชุดดินที่ 5",
      description: "ดินลูกรัง เหมาะสำหรับปลูกไม้ผล เช่น ส้มโอ มะพร้าว",
      province: "กำแพงเพชร",
      image: "/images/KampaengPhet.jpg",
      fullDescription:
        "ชุดดินที่ 5 เป็นดินลูกรัง เหมาะสำหรับการปลูกไม้ผลที่ทนแล้งได้ดี เช่น ส้มโอ มะพร้าว การระบายน้ำดีมาก และไม่ท่วมขัง",
    },
    {
      name: "ชุดดินที่ 6",
      description: "ดินเปรี้ยว เหมาะสำหรับพืชที่ทนกรด เช่น พริก มะเขือเทศ",
      province: "ลำปาง",
      image: "/images/Lampang.jpg",
      fullDescription:
        "ชุดดินที่ 6 เป็นดินเปรี้ยวที่เหมาะสำหรับพืชที่ทนกรด เช่น พริก มะเขือเทศ ดินประเภทนี้มี pH ต่ำ แต่สามารถเติมสารปรับ pH ได้",
    },
    {
      name: "ชุดดินที่ 7",
      description: "ดินปนทราย เหมาะสำหรับการปลูกพืชเช่น มะม่วง ทุเรียน",
      province: "สิงห์บุรี",
      image: "/images/SingBuri.jpg",
      fullDescription:
        "ชุดดินที่ 7 เป็นดินปนทราย เหมาะสำหรับการปลูกพืชที่ต้องการการระบายน้ำดี เช่น มะม่วง ทุเรียน",
    },
    {
      name: "ชุดดินที่ 8",
      description: "ดินร่วนปนเหนียว เหมาะสำหรับปลูกข้าวและพืชที่ต้องการน้ำมาก",
      province: "อุทัยธานี",
      image: "/images/UthaiThani.jpg",
      fullDescription:
        "ชุดดินที่ 8 เป็นดินร่วนปนเหนียว เหมาะสำหรับการปลูกข้าวและพืชที่ต้องการน้ำมาก เนื่องจากมีคุณสมบัติในการเก็บกักน้ำได้ดี",
    },
    {
      name: "ชุดดินที่ 9",
      description: "ดินเหนียวปนทราย เหมาะสำหรับปลูกอ้อยและมันสำปะหลัง",
      province: "นครปฐม",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 9 เป็นดินเหนียวปนทราย เหมาะสำหรับปลูกพืชที่ต้องการน้ำค่อนข้างมาก เช่น อ้อย มันสำปะหลัง",
    },
    {
      name: "ชุดดินที่ 10",
      description: "ดินดาน เหมาะสำหรับพืชทนแล้งเช่น พืชตระกูลถั่ว",
      province: "เชียงใหม่",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 10 เป็นดินดานที่เหมาะสำหรับพืชทนแล้ง เช่น พืชตระกูลถั่ว โดยดินประเภทนี้ไม่ต้องการน้ำมาก",
    },
    {
      name: "ชุดดินที่ 11",
      description: "ดินน้ำท่วม เหมาะสำหรับการปลูกข้าวและพืชที่ต้องการน้ำมาก",
      province: "อุดรธานี",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 11 เป็นดินที่ท่วมขังน้ำ เหมาะสำหรับการปลูกพืชที่ต้องการน้ำมาก เช่น ข้าว",
    },
    {
      name: "ชุดดินที่ 12",
      description: "ดินขาว เหมาะสำหรับการปลูกพืชสวน เช่น มะนาว และฝรั่ง",
      province: "ประจวบคีรีขันธ์",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 12 เป็นดินขาวที่เหมาะสำหรับการปลูกพืชสวน เช่น มะนาวและฝรั่ง",
    },
    {
      name: "ชุดดินที่ 13",
      description: "ดินทรายปนดินเหนียว เหมาะสำหรับการปลูกข้าวโพด และพืชไร่",
      province: "เพชรบุรี",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 13 เป็นดินทรายปนดินเหนียว เหมาะสำหรับการปลูกข้าวโพด และพืชไร่",
    },
    {
      name: "ชุดดินที่ 14",
      description: "ดินร่วน เหมาะสำหรับการปลูกพืชสวน เช่น ทุเรียน และมังคุด",
      province: "ตราด",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 14 เป็นดินร่วน เหมาะสำหรับการปลูกพืชสวน เช่น ทุเรียนและมังคุด",
    },
    {
      name: "ชุดดินที่ 15",
      description: "ดินชื้น เหมาะสำหรับพืชที่ต้องการความชื้น เช่น ขิง ข่า ตะไคร้",
      province: "พะเยา",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 15 เป็นดินชื้นที่เหมาะสำหรับการปลูกพืชที่ต้องการความชื้นสูง เช่น ขิง ข่า ตะไคร้",
    },
    {
      name: "ชุดดินที่ 16",
      description: "ดินทรายปนดินเหนียว เหมาะสำหรับพืชทนแล้ง เช่น กระบองเพชร",
      province: "อุบลราชธานี",
      image: "/images/PathumThanisoil.jpg",
      fullDescription:
        "ชุดดินที่ 16 เป็นดินทรายปนดินเหนียว เหมาะสำหรับการปลูกพืชทนแล้ง เช่น กระบองเพชร",
    },
  ];

  // จัดการสถานะต่าง ๆ
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // กำหนดจำนวน Card ต่อหน้า
  const [open, setOpen] = useState(false);
  const [selectedSoil, setSelectedSoil] = useState(null);

  // หาค่าดัชนีเริ่มต้นและสุดท้ายของข้อมูลในแต่ละหน้า
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = soilData.slice(indexOfFirstItem, indexOfLastItem);

  // ฟังก์ชันเปิด Dialog
  const handleOpen = (soil) => {
    setSelectedSoil(soil);
    setOpen(true);
  };

  // ฟังก์ชันปิด Dialog
  const handleClose = () => {
    setOpen(false);
  };

  // ฟังก์ชันเปลี่ยนหน้า Pagination
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      {/* Grid แสดง Card ของดินแต่ละชุด */}
      <Grid container spacing={2} justifyContent="center">
        {currentItems.map((soil, index) => (
          <Grid
            item
            xs={12}        // จอเล็กสุด ให้กินทั้งแถว (12 จาก 12 คอลัมน์)
            sm={6}         // จอเล็กขึ้น ให้กินครึ่ง (6 จาก 12 คอลัมน์)
            md={4}         // จอกลาง ให้กิน 4 จาก 12 (3 ใบต่อแถว)
            lg={3}         // จอใหญ่ ให้กิน 3 จาก 12 (4 ใบต่อแถว)
            key={index}
          >
            <Card
              sx={{
                width: "100%",           // กว้างเต็ม Grid
                height: "100%",          // สูงเท่าที่เนื้อหาจะมี
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(soil)}
            >
              <CardMedia
                component="img"
                image={soil.image}
                alt={soil.name}
                sx={{
                  width: "100%",
                  height: 140,           // กำหนดความสูงของรูป
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {soil.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  {soil.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  จังหวัด: {soil.province}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(soilData.length / itemsPerPage)} // นับจำนวนหน้าทั้งหมด
        page={page}                                       // หน้าปัจจุบัน
        onChange={handleChangePage}                       // ฟังก์ชันเปลี่ยนหน้า
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />

      {/* Dialog สำหรับแสดงรายละเอียดเพิ่มเติม */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedSoil?.name}</DialogTitle>
        <DialogContent>
          {/* แสดงรูปใน Dialog */}
          <CardMedia
            component="img"
            image={selectedSoil?.image}
            alt={selectedSoil?.name}
            sx={{ height: 200, objectFit: "cover", marginBottom: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            รายละเอียดชุดดิน
          </Typography>
          <Typography variant="body1" paragraph>
            {selectedSoil?.fullDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            จังหวัด: {selectedSoil?.province}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SoilCard;
