import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Soildata = () => {
  const { id } = useParams(); // รับ id จาก URL
  const soilData = [
    {
      name: "ชุดดินที่ 1",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      image: "/images/142ชุดดิน-14-10-2022_Page_004",
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

  const soil = soilData[id]; // ใช้ id เพื่อค้นหาชุดดินที่เลือก

  return (
    <div>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardMedia
          component="img"
          image={soil.image}
          alt={soil.name}
          sx={{ width: "100%", height: 300, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {soil.name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {soil.fullDescription}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Soildata;
