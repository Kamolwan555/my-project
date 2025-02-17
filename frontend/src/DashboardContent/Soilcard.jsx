import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Pagination, CardMedia, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";

const SoilCard = () => {
  const navigate = useNavigate();
  
  const soilData = useMemo(() => [
    {
      name: "ชุดดินที่ 1",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (1).png"
    },
    {
      name: "ชุดดินที่ 2",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (2).png"
    },
    {
      name: "ชุดดินที่ 3",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (3).png"
    },
    {
      name: "ชุดดินที่ 4",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (4).png"
    },
    {
      name: "ชุดดินที่ 5",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (5).png"
    },
    {
      name: "ชุดดินที่ 6",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (6).png"
    },
    {
      name: "ชุดดินที่ 7",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (7).png"
    },
    {
      name: "ชุดดินที่ 8",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (8).png"
    },
    {
      name: "ชุดดินที่ 9",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (9).png"
    },
    {
      name: "ชุดดินที่ 10",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (10).png"
    },
    {
      name: "ชุดดินที่ 11",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (11).png"
    },
    {
      name: "ชุดดินที่ 12",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (12).png"
    },
    {
      name: "ชุดดินที่ 13",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (13).png"
    },
    {
      name: "ชุดดินที่ 14",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (14).png"
    },
    {
      name: "ชุดดินที่ 15",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (15).png"
    },
    {
      name: "ชุดดินที่ 16",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (16).png"
    },
    {
      name: "ชุดดินที่ 17",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (17).png"
    },
    {
      name: "ชุดดินที่ 18",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (18).png"
    },
    {
      name: "ชุดดินที่ 19",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (19).png"
    },
    {
      name: "ชุดดินที่ 20",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (20).png"
    },
    {
      name: "ชุดดินที่ 21",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (21).png"
    },
    {
      name: "ชุดดินที่ 22",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (22).png"
    },
    {
      name: "ชุดดินที่ 23",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (23).png"
    },
    {
      name: "ชุดดินที่ 24",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (24).png"
    },
    {
      name: "ชุดดินที่ 25",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (25).png"
    },
    {
      name: "ชุดดินที่ 26",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (26).png"
    },
    {
      name: "ชุดดินที่ 27",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (27).png"
    },
    {
      name: "ชุดดินที่ 28",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (28).png"
    },
    {
      name: "ชุดดินที่ 29",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (29).png"
    },
    {
      name: "ชุดดินที่ 30",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (30).png"
    },
    {
      name: "ชุดดินที่ 31",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (31).png"
    },
    {
      name: "ชุดดินที่ 32",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (32).png"
    },
    {
      name: "ชุดดินที่ 33",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (33).png"
    },
    {
      name: "ชุดดินที่ 34",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (34).png"
    },
    {
      name: "ชุดดินที่ 35",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (35).png"
    },
    {
      name: "ชุดดินที่ 36",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (36).png"
    },
    {
      name: "ชุดดินที่ 37",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (37).png"
    },
    {
      name: "ชุดดินที่ 38",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (38).png"
    },
    {
      name: "ชุดดินที่ 39",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (39).png"
    },
    {
      name: "ชุดดินที่ 40",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (40).png"
    },
    {
      name: "ชุดดินที่ 41",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (41).png"
    },
    {
      name: "ชุดดินที่ 42",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (42).png"
    },
    {
      name: "ชุดดินที่ 43",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (43).png"
    },
    {
      name: "ชุดดินที่ 44",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (44).png"
    },
    {
      name: "ชุดดินที่ 45",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (45).png"
    },
    {
      name: "ชุดดินที่ 46",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (46).png"
    },
    {
      name: "ชุดดินที่ 47",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (47).png"
    },
    {
      name: "ชุดดินที่ 48",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (48).png"
    },
    {
      name: "ชุดดินที่ 49",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (49).png"
    },
    {
      name: "ชุดดินที่ 50",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (50).png"
    },
    {
      name: "ชุดดินที่ 51",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (51).png"
    },
    {
      name: "ชุดดินที่ 52",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (52).png"
    },
    {
      name: "ชุดดินที่ 53",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (53).png"
    },
    {
      name: "ชุดดินที่ 54",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (54).png"
    },
    {
      name: "ชุดดินที่ 55",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (55).png"
    },
    {
      name: "ชุดดินที่ 56",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (56).png"
    },
    {
      name: "ชุดดินที่ 57",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (57).png"
    },
    {
      name: "ชุดดินที่ 58",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (58).png"
    },
    {
      name: "ชุดดินที่ 59",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (59).png"
    },
    {
      name: "ชุดดินที่ 60",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (60).png"
    },
    {
      name: "ชุดดินที่ 61",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (61).png"
    },
    {
      name: "ชุดดินที่ 62",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (62).png"
    },
    {
      name: "ชุดดินที่ 63",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (63).png"
    },
    {
      name: "ชุดดินที่ 64",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (64).png"
    },
    {
      name: "ชุดดินที่ 65",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (65).png"
    },
    {
      name: "ชุดดินที่ 66",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (66).png"
    },
    {
      name: "ชุดดินที่ 67",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (67).png"
    },
    {
      name: "ชุดดินที่ 68",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (68).png"
    },
    {
      name: "ชุดดินที่ 69",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (69).png"
    },
    {
      name: "ชุดดินที่ 70",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (70).png"
    },
    {
      name: "ชุดดินที่ 71",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (71).png"
    },
    {
      name: "ชุดดินที่ 72",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (72).png"
    },
    {
      name: "ชุดดินที่ 73",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (73).png"
    },
    {
      name: "ชุดดินที่ 74",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (74).png"
    },
    {
      name: "ชุดดินที่ 75",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (75).png"
    },
    {
      name: "ชุดดินที่ 76",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (76).png"
    },
    {
      name: "ชุดดินที่ 77",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (77).png"
    },
    {
      name: "ชุดดินที่ 78",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (78).png"
    },
    {
      name: "ชุดดินที่ 79",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (79).png"
    },
    {
      name: "ชุดดินที่ 80",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (80).png"
    },
    {
      name: "ชุดดินที่ 81",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (81).png"
    },
    {
      name: "ชุดดินที่ 82",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (82).png"
    },
    {
      name: "ชุดดินที่ 83",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (83).png"
    },
    {
      name: "ชุดดินที่ 84",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (84).png"
    },
    {
      name: "ชุดดินที่ 85",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (85).png"
    },
    {
      name: "ชุดดินที่ 86",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (86).png"
    },
    {
      name: "ชุดดินที่ 87",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (87).png"
    },
    {
      name: "ชุดดินที่ 88",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (88).png"
    },
    {
      name: "ชุดดินที่ 89",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (89).png"
    },
    {
      name: "ชุดดินที่ 90",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (90).png"
    },
    {
      name: "ชุดดินที่ 91",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (91).png"
    },
    {
      name: "ชุดดินที่ 92",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (92).png"
    },
    {
      name: "ชุดดินที่ 93",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (93).png"
    },
    {
      name: "ชุดดินที่ 94",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (94).png"
    },
    {
      name: "ชุดดินที่ 95",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (95).png"
    },
    {
      name: "ชุดดินที่ 96",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (96).png"
    },
    {
      name: "ชุดดินที่ 97",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (97).png"
    },
    {
      name: "ชุดดินที่ 98",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (98).png"
    },
    {
      name: "ชุดดินที่ 99",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (99).png"
    },
    {
      name: "ชุดดินที่ 100",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (100).png"
    },
    {
      name: "ชุดดินที่ 101",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (101).png"
    },
    {
      name: "ชุดดินที่ 102",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (102).png"
    },
    {
      name: "ชุดดินที่ 103",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (103).png"
    },
    {
      name: "ชุดดินที่ 104",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (104).png"
    },
    {
      name: "ชุดดินที่ 105",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (105).png"
    },
    {
      name: "ชุดดินที่ 106",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (106).png"
    },
    {
      name: "ชุดดินที่ 107",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (107).png"
    },
    {
      name: "ชุดดินที่ 108",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (108).png"
    },
    {
      name: "ชุดดินที่ 109",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (109).png"
    },
    {
      name: "ชุดดินที่ 110",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (110).png"
    },
    {
      name: "ชุดดินที่ 111",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (111).png"
    },
    {
      name: "ชุดดินที่ 112",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (112).png"
    },
    {
      name: "ชุดดินที่ 113",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (113).png"
    },
    {
      name: "ชุดดินที่ 114",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (114).png"
    },
    {
      name: "ชุดดินที่ 115",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (115).png"
    },
    {
      name: "ชุดดินที่ 116",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (116).png"
    },
    {
      name: "ชุดดินที่ 117",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (117).png"
    },
    {
      name: "ชุดดินที่ 118",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (118).png"
    },
    {
      name: "ชุดดินที่ 119",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (119).png"
    },
    {
      name: "ชุดดินที่ 120",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (120).png"
    },
    {
      name: "ชุดดินที่ 121",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (121).png"
    },
    {
      name: "ชุดดินที่ 122",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (122).png"
    },
    {
      name: "ชุดดินที่ 123",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (123).png"
    },
    {
      name: "ชุดดินที่ 124",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (124).png"
    },
    {
      name: "ชุดดินที่ 125",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (125).png"
    },
    {
      name: "ชุดดินที่ 126",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (126).png"
    },
    {
      name: "ชุดดินที่ 127",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (127).png"
    },
    {
      name: "ชุดดินที่ 128",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (128).png"
    },
    {
      name: "ชุดดินที่ 129",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (129).png"
    },
    {
      name: "ชุดดินที่ 130",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (130).png"
    },
    {
      name: "ชุดดินที่ 131",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (131).png"
    },
    {
      name: "ชุดดินที่ 132",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (132).png"
    },
    {
      name: "ชุดดินที่ 133",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (133).png"
    },
    {
      name: "ชุดดินที่ 134",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (134).png"
    },
    {
      name: "ชุดดินที่ 135",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (135).png"
    },
    {
      name: "ชุดดินที่ 136",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (136).png"
    },
    {
      name: "ชุดดินที่ 137",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (137).png"
    },
    {
      name: "ชุดดินที่ 138",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (138).png"
    },
    {
      name: "ชุดดินที่ 139",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (139).png"
    },
    {
      name: "ชุดดินที่ 140",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (140).png"
    },
    {
      name: "ชุดดินที่ 141",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (141).png"
    },
    {
      name: "ชุดดินที่ 142",
      description: "ดินทรายจัด เหมาะสำหรับพืชไร่ เช่น อ้อย มันสำปะหลัง",
      province: "ปทุมธานี",
      image: "/images/142ชุดดิน-14-10-2022_soildataset (142).png"
    }
    
], []);

const [page, setPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(8); // Default to 8 items per page

const handlePageChange = (event, value) => {
  setPage(value);
};

const handleItemsPerPageChange = (event) => {
  setItemsPerPage(event.target.value);
  setPage(1); // Reset to first page when items per page change
};

const currentItems = soilData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

const handleCardClick = (id) => {
  navigate(`/soil/${id}`);
};

return (
  <div>
    {/* Grid for the soil data */}
    <Grid container spacing={2} justifyContent="center">
      {currentItems.map((soil, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              boxShadow: "none", 
              borderRadius: 2, 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)", 
              },
            }}
            onClick={() => handleCardClick(index)} 
          >
            <CardMedia
              component="img"
              alt={soil.name}
              height="140"
              image={soil.image}
              sx={{
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ flexGrow: 1, padding: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: 16 }}>
                {soil.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
                {soil.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Pagination and Items per page at the top-right */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel sx={{ fontSize: 14 }}>Items</InputLabel>
        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          label="Items"
          sx={{ fontSize: 14, height: 30 }}
        >
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={36}>36</MenuItem>
          <MenuItem value={142}>142</MenuItem>

        </Select>
      </FormControl>

      <Pagination
        count={Math.ceil(soilData.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: 14,
          },
          marginLeft: 2,
        }}
      />
    </Box>
  </div>
);
};

export default SoilCard;