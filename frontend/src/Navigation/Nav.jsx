import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography, Divider, ListItemButton, useMediaQuery, } from "@mui/material";
import {
  Menu as MenuIcon,
  DashboardRounded as DashboardRoundedIcon,
  CalculateRounded as CalculateRoundedIcon,
  ShoppingCartRounded as ShoppingCartRoundedIcon,
  TerrainRounded as TerrainRoundedIcon,
  LocalFloristRounded as LocalFloristRoundedIcon,
  DataUsageRounded as DataUsageRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
  AccountBoxRounded as AccountBoxRoundedIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          background: "linear-gradient(90deg, #38b000, #70e000)",
          color: "#FFFFFF",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF", 
          "&:hover": {
            backgroundColor: "#008000", 
            borderRadius: "4px", 
          },
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

// Menu items for the drawer
const menuItems = [
  { kind: 'header', title: 'เมนูหลัก' }, 
  { key: "/home", label: "หน้าหลัก", icon: <DashboardRoundedIcon />, link: "/home" },
  { key: "/calculate", label: "คำนวณ", icon: <CalculateRoundedIcon />, link: "/calculate" },
  { key: "/order", label: "คำสั่งซื้อ", icon: <ShoppingCartRoundedIcon />, link: "/order" },
  { kind: 'header', title: 'ตรวจสอบข้อมูล' }, // เพิ่ม header
  { key: "/soil", label: "ตรวจสอบดิน", icon: <TerrainRoundedIcon />, link: "/soil" },
  { key: "/fertilizer", label: "ตรวจสอบปุ๋ย", icon: <LocalFloristRoundedIcon />, link: "/fertilizer" },
  { key: "/soildata", label: "ชุดข้อมูลดิน", icon: <DataUsageRoundedIcon />, link: "/soildata" },
  { kind: 'header', title: 'การตั้งค่า' }, // เพิ่ม header
  { key: "/logout", label: "ออกจากระบบ", icon: <LogoutRoundedIcon />, link: "/logout" },
];

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
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

  return (
    <ThemeProvider theme={demoTheme}>
      {/* Add Sarabun font from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;700&display=swap" rel="stylesheet" />

      <Box sx={{ display: "flex" }}>
        {/* AppBar */}
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
              Fertilizer
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant={isSmallScreen ? "temporary" : "persistent"}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            width: isDrawerOpen ? 220 : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 220,
              color: "#38b000", // text menu color
              transition: "width 0.3s ease-out",
              height: "calc(100% - 64px)",
              position: "fixed",
              top: 64, // Position below the AppBar
              zIndex: (theme) => theme.zIndex.drawer,
            },
          }}
        >
          {/* Menu Items */}
          <Box sx={{ flexGrow: 1 }}>
            <List>
              {menuItems.map((item) => {
                if (item.kind === 'header') {
                  // แสดง header
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
                  // แสดง menu items
                  return (
                    <ListItemButton
                      key={item.key}
                      component={Link}
                      to={item.link}
                      selected={location.pathname === item.link}
                      onClick={handleMenuItemClick}
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

          {/* User Config Button */}
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

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: isSmallScreen ? "100%" : `calc(100% - ${isDrawerOpen ? 220 : 0}px)`,
            transition: "width 0.3s ease-out",
          }}
        >
          <Toolbar /> {/* Push content down below the AppBar */}
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Navigation;