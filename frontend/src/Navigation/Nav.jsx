import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Calculate as CalculateIcon,
  ShoppingCart as ShoppingCartIcon,
  Terrain as TerrainIcon,
  EmojiNature as EmojiNatureIcon,
  DataUsage as DataUsageIcon,
  Recommend as RecommendIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const menuItems = [
  { key: "/home", label: "หน้าหลัก", icon: <HomeIcon />, link: "/home" },
  {
    key: "/calculate",
    label: "คำนวณ",
    icon: <CalculateIcon />,
    link: "/calculate",
  },
  {
    key: "/order",
    label: "คำสั่งซื้อ",
    icon: <ShoppingCartIcon />,
    link: "/order",
  },
  { key: "/soil", label: "ตรวจสอบดิน", icon: <TerrainIcon />, link: "/soil" },
  {
    key: "/fertilizer",
    label: "ตรวจสอบปุ๋ย",
    icon: <EmojiNatureIcon />,
    link: "/fertilizer",
  },
  {
    key: "/soildata",
    label: "ชุดข้อมูลดิน",
    icon: <DataUsageIcon />,
    link: "/soildata",
  },
  {
    key: "/recommend",
    label: "คำแนะนำ",
    icon: <RecommendIcon />,
    link: "/recommend",
  },
  {
    key: "/logout",
    label: "ออกจากระบบ",
    icon: <LogoutIcon />,
    link: "/logout",
  },
];

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans Thai, serif',
  },
});

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        color="white"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above Drawer
          marginLeft: isDrawerOpen ? "220px" : "0", // Adjust margin-left when Drawer is open
          width: isDrawerOpen ? "calc(100% - 220px)" : "100%", // Adjust width of AppBar
          transition: "margin 0.3s ease-out, width 0.3s ease-out",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ระบบจัดการปุ๋ย
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        open={isDrawerOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: 220,
            backgroundColor: "#08bb00",
            color: "#ffffff",
            transition: "width 0.3s ease-out",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "top",
            height: 120,
          }}
        >
          <img
            alt="Your Company"
            src="https://i.postimg.cc/htCbfgrh/freepik-the-style-is-candid-image-photography-with-natural-94126-1.jpg"
            style={{
              height: 70,
              objectFit: "contain",
            }}
          />
          <Typography variant="h6" color="secondary" sx={{ mt: 1 }}>
            Your Fertilizer
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.key}
              component={Link}
              to={item.link}
              selected={location.pathname === item.link}
              sx={{
                "&.Mui-selected": { backgroundColor: "#005700" },
                "&:hover": { backgroundColor: "#007f00" },
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s ease-out",
          marginLeft: isDrawerOpen ? "240px" : "0px",
        }}
      >
        <Toolbar /> {/* Push Content Down */}
        <Outlet />
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default Navigation;
