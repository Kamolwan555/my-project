import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography, Divider, ListItemButton, useMediaQuery, Menu, MenuItem, Grid, Avatar, Badge
} from "@mui/material";
import {
  Menu as MenuIcon,
  HomeRounded as HomeRoundedIcon,
  CalculateRounded as CalculateRoundedIcon,
  ShoppingCartRounded as ShoppingCartRoundedIcon,
  // TerrainRounded as TerrainRoundedIcon,
  LocalFloristRounded as LocalFloristRoundedIcon,
  DataUsageRounded as DataUsageRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
  AccountBoxRounded as AccountBoxRoundedIcon,
  NotificationsRounded as NotificationsRoundedIcon,
  PersonRounded as PersonRoundedIcon,
  Person2Rounded as Person2RoundedIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2"; // นำเข้า SweetAlert2
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


const demoTheme = createTheme({
  typography: {
    fontFamily: "'Sarabun', sans-serif",
    h6: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500 },
  },
  palette: {
    primary: { main: "#38b000" },
    secondary: { main: "#4CAF50" },
    background: { default: "#F5F5F5" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#38b000",
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
  { kind: 'header', title: 'เมนูหลัก', roles: ["Administrator", "Farmer", "Customer"] },
  { key: "/home", label: "หน้าหลัก", icon: <HomeRoundedIcon />, link: "/home", roles: ["Administrator", "Farmer", "Customer"] },
  { key: "/calculate", label: "คำนวณ", icon: <CalculateRoundedIcon />, link: "/cropcal", roles: ["Administrator", "Farmer", "Customer"] },
  { key: "/order", label: "คำสั่งซื้อ", icon: <ShoppingCartRoundedIcon />, link: "/order", roles: ["Administrator", "Farmer", "Customer"] },
  { kind: 'header', title: 'ตรวจสอบข้อมูล', roles: ["Administrator", "Farmer", "Customer"] },
  // { key: "/soil", label: "ตรวจสอบดิน", icon: <TerrainRoundedIcon />, link: "/soil", roles: ["Administrator", "Farmer"] },
  { key: "/fertilizer", label: "ตรวจสอบปุ๋ย", icon: <LocalFloristRoundedIcon />, link: "/fertilizer", roles: ["Administrator", "Farmer"] },
  { key: "/soilcard", label: "ชุดข้อมูลดิน", icon: <DataUsageRoundedIcon />, link: "/soilcard", roles: ["Administrator", "Farmer", "Customer"] },
  { kind: 'header', title: 'การตั้งค่า', roles: ["Administrator", "Farmer", "Customer"] },
  { key: "/logout", label: "ออกจากระบบ", icon: <LogoutRoundedIcon />, link: "/logout", roles: ["Administrator", "Farmer", "Customer"] },
];

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State สำหรับควบคุมการเปิดปิดเมนูโปรไฟล์
  const [user, setUser] = useState(null); // State สำหรับเก็บข้อมูลผู้ใช้
  const [userrole, setUserrole] = useState(null)
  const [loading, setLoading] = useState(true); // State สำหรับการโหลดข้อมูล
  const [error, setError] = useState(null); // State สำหรับเก็บข้อผิดพลาด
  const location = useLocation();
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการ redirect
  const isSmallScreen = useMediaQuery(demoTheme.breakpoints.down("sm"));
  const [alertCount, setAlertCount] = useState(0);
  useEffect(() => {
    if (isSmallScreen) {
      setIsDrawerOpen(false);
    }
  }, [isSmallScreen]);
  const [alerts, setAlerts] = useState([]);
  const [anchorEl1, setAnchorEl1] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const eventSource = new EventSource(`http://localhost:5000/sensors/alerts?jwt=${token}`);
    eventSource.onmessage = (event) => {
      try {
        const alertData = JSON.parse(event.data);
        // Increase alert count
        setAlertCount((prevCount) => prevCount + 1);
        setAlerts((prevAlerts) => [...prevAlerts, alertData]);

        toast.error(`Alert: ${alertData.alert}`, {
          position: "top-right",
          autoClose: false,
          closeOnClick: true,
        });
      } catch (error) {
        console.error("Error parsing alert data:", error);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      eventSource.close();
    };

    // Clean up on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  const handleNotificationsClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl1(null);
  };




  // ดึงข้อมูลผู้ใช้จาก API
  useEffect(() => {
    const user_id = localStorage.getItem('user_id'); // ดึง user_id จาก localStorage
    setUserrole(localStorage.getItem('roleName'))
    if (!user_id) {
      setError('ไม่พบข้อมูลผู้ใช้');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("accessToken")
    fetch(`http://localhost:5000/user/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
        }
        return response.json();
      })
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
        localStorage.removeItem('user_id'); // ลบ user_id ออกจาก localStorage
        navigate("/");
      }
    });
  };

  // ฟังก์ชันสำหรับเปิดเมนูโปรไฟล์
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // ฟังก์ชันสำหรับปิดเมนูโปรไฟล์
  const handleProfileMenuClose = (path) => {
    setAnchorEl(null);
    if (path) {
      navigate(path); // นำทางไปยัง path ที่กำหนด
    }
  };
  const handleClearAlerts = () => {
    setAlerts([]);
    toast.dismiss();
    setAlertCount(0);
    handleNotificationsClose();
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
              <IconButton color="inherit" aria-label="notifications" onClick={handleNotificationsClick}>
                <Badge badgeContent={alertCount} color="secondary">
                  <NotificationsRoundedIcon />
                </Badge>
              </IconButton>
              <ToastContainer />
              <Menu
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={handleNotificationsClose}
              >
                {alerts.length > 0 ? (
                  <>
                    {alerts.map((alert, index) => (
                      <MenuItem key={index} onClick={handleNotificationsClose}>
                        {alert.alert}
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleClearAlerts} sx={{ color: 'red' }}>
                      ล้างข้อมูลการแจ้งเตือน
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={handleNotificationsClose}>ไม่มีข้อมูลการแจ้งเตือน</MenuItem>
                )}
              </Menu>

              <IconButton
                color="inherit"
                aria-label="profile"
                onClick={handleProfileMenuOpen}
              >
                <PersonRoundedIcon />
              </IconButton>
            </Box>

            {/* เมนูโปรไฟล์ */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleProfileMenuClose()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                style: {
                  width: 300,
                  padding: 16,
                  borderRadius: 12,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              {/* ส่วนหัวของเมนูโปรไฟล์ */}
              {loading ? (
                <Typography>กำลังโหลด...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : user ? (
                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Grid item>
                    <Avatar alt={user.username} src="/path/to/avatar.jpg" sx={{ width: 56, height: 56 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{user.first_name} {user.last_name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography>ไม่พบข้อมูลผู้ใช้</Typography>
              )}

              <Divider sx={{ my: 2 }} />

              {/* เมนูย่อย */}
              <Box>
                <MenuItem
                  onClick={() => handleProfileMenuClose('/profile')}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Person2RoundedIcon fontSize="small" sx={{ color: 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="ดูโปรไฟล์" />
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemIcon>
                    <LogoutRoundedIcon fontSize="small" sx={{ color: 'error.main' }} />
                  </ListItemIcon>
                  <ListItemText primary="ออกจากระบบ" />
                </MenuItem>
              </Box>
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          variant={isSmallScreen ? "temporary" : "persistent"}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            width: isDrawerOpen ? 350 : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 360,
              color: "#FFFFFF", // เปลี่ยนสีข้อความเป็นสีขาว
              backgroundColor: "#121212", // เปลี่ยนสีพื้นหลังเป็นสีเข้ม
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
                if (item.roles && (!userrole || !item.roles.includes(userrole))) {
                  return null;
                }
                if (item.kind === 'header') {
                  return (
                    <Typography
                      key={item.title}
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#38b000", // เปลี่ยนสีข้อความหัวข้อ
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
                      onClick={item.key === "/logout" ? handleLogout : handleMenuItemClick}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#38b000",
                          color: "#FFFFFF",
                        },
                        "&:hover": { backgroundColor: "#1E1E1E", color: "#38b000" }, // เปลี่ยนสีเมื่อ hover
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

          <Divider sx={{ backgroundColor: "#333" }} /> {/* เปลี่ยนสีเส้นแบ่ง */}
          {userrole == 'Administrator' && (
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
                "&:hover": { backgroundColor: "#1E1E1E", color: "#38b000" }, // เปลี่ยนสีเมื่อ hover
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <AccountBoxRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="การตั้งค่าผู้ใช้" />
            </ListItem>
          )}
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