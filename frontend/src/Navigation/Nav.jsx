import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography, Divider, ListItemButton, useMediaQuery, } from "@mui/material";
import {
  Menu as MenuIcon,
  HomeRounded as HomeRoundedIcon,
  CalculateRounded as CalculateRoundedIcon,
  ShoppingCartRounded as ShoppingCartRoundedIcon,
  TerrainRounded as TerrainRoundedIcon,
  LocalFloristRounded as LocalFloristRoundedIcon,
  DataUsageRounded as DataUsageRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
  AccountBoxRounded as AccountBoxRoundedIcon,
  Notifications as NotificationsRoundedIcon,
  Person as PersonRoundedIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2"; // นำเข้า SweetAlert2

const demoTheme = createTheme({
  typography: {
    fontFamily: "'Sarabun', sans-serif",
    h6: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500 },
  },
  palette: {
    primary: { main: "#FFFFFF" },
    background: { default: "#E8F5E9" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#38b000",
          // background: "linear-gradient(90deg, #38b000, #70e000)",
          color: "#FFFFFF",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF", 
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const menuItems = [
  { kind: 'header', title: 'เมนูหลัก' }, 
  { key: "/home", label: "หน้าหลัก", icon: <HomeRoundedIcon />, link: "/home" },
  { key: "/calculate", label: "คำนวณ", icon: <CalculateRoundedIcon />, link: "/calculate" },
  { key: "/order", label: "คำสั่งซื้อ", icon: <ShoppingCartRoundedIcon />, link: "/order" },
  { kind: 'header', title: 'ตรวจสอบข้อมูล' }, 
  { key: "/soil", label: "ตรวจสอบดิน", icon: <TerrainRoundedIcon />, link: "/soil" },
  { key: "/fertilizer", label: "ตรวจสอบปุ๋ย", icon: <LocalFloristRoundedIcon />, link: "/fertilizer" },
  { key: "/soildata", label: "ชุดข้อมูลดิน", icon: <DataUsageRoundedIcon />, link: "/soildata" },
  { kind: 'header', title: 'การตั้งค่า' }, 
  { key: "/logout", label: "ออกจากระบบ", icon: <LogoutRoundedIcon />, link: "/logout" },
];

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการ redirect
  const isSmallScreen = useMediaQuery(demoTheme.breakpoints.down("sm"));

  useEffect(() => {
    if (isSmallScreen) {
      setIsDrawerOpen(false);
    }
  }, [isSmallScreen]);

  const handleMenuItemClick = () => {
    if (isSmallScreen) {
      setIsDrawerOpen(false);
    }
  };

  // ฟังก์ชันสำหรับการออกจากระบบ
  const handleLogout = (event) => {
    event.preventDefault(); 
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการออกจากระบบหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#38b000",
      cancelButtonColor: "#d33",
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
      customClass: {
        popup: 'sarabun-font', // เพิ่มคลาสสำหรับ font family
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); 
      }
    });
  };

  return (
    <ThemeProvider theme={demoTheme}>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>
        {`
          .sarabun-font {
            font-family: 'Sarabun', sans-serif !important;
          }
        `}
      </style>

      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
              <MenuIcon />
            </IconButton>
            <img
              src="https://img2.imgbiz.com/imgbiz/Green-Modern-Scope-Gardening-Logo-Design-2.png"
              alt="logo"
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ปุ๋ยชีวอินทรีย์
            </Typography>

            {/* ปุ่ม Notification และ Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" aria-label="notifications">
                <NotificationsRoundedIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="profile">
                <PersonRoundedIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant={isSmallScreen ? "temporary" : "persistent"}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            width: isDrawerOpen ? 220 : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 220,
              color: "#38b000",
              transition: "width 0.3s ease-out",
              height: "calc(100% - 64px)",
              position: "fixed",
              top: 64,
              zIndex: (theme) => theme.zIndex.drawer,
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <List>
              {menuItems.map((item) => {
                if (item.kind === 'header') {
                  return (
                    <Typography
                      key={item.title}
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#38b000",
                        padding: "16px 16px 8px 16px",
                        textTransform: "uppercase",
                        fontSize: "14px", 
                      }}
                    >
                      {item.title}
                    </Typography>
                  );
                } else {
                  return (
                    <ListItemButton
                      key={item.key}
                      component={Link}
                      to={item.link}
                      selected={location.pathname === item.link}
                      onClick={item.key === "/logout" ? handleLogout : handleMenuItemClick} // เรียก handleLogout เมื่อคลิกที่ "ออกจากระบบ"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#38b000",
                          color: "#FFFFFF",
                        },
                        "&:hover": { backgroundColor: "#f6f6f6", color: "#38b000" },
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  );
                }
              })}
            </List>
          </Box>

          <Divider />

          <ListItem
            button
            key="/userconfig"
            component={Link}
            to="/configmenu"
            onClick={handleMenuItemClick}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#38b000",
                color: "#FFFFFF",
              },
              "&:hover": { backgroundColor: "#f6f6f6", color: "#38b000" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <AccountBoxRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="การตั้งค่าผู้ใช้" />
          </ListItem>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: isSmallScreen ? "100%" : `calc(100% - ${isDrawerOpen ? 220 : 0}px)`,
            transition: "width 0.3s ease-out",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Navigation;