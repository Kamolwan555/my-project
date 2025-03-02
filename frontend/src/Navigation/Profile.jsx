import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar, Divider, Skeleton, useTheme } from '@mui/material';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');

        if (!user_id) {
            setError('ไม่พบข้อมูลผู้ใช้');
            setLoading(false);
            return;
        }

        fetch(`http://localhost:5000/user/${user_id}`)
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

    if (loading) {
        return (
            <Box sx={{ flexGrow: 1, padding: 3, minHeight: '100vh' }}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
                            <Skeleton variant="circular" width={120} height={120} />
                            <Skeleton variant="text" width="60%" height={40} />
                            <Skeleton variant="text" width="40%" height={30} />
                            <Divider sx={{ my: 2 }} />
                            <Skeleton variant="text" width="80%" height={20} />
                            <Skeleton variant="text" width="80%" height={20} />
                            <Skeleton variant="text" width="80%" height={20} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!user) {
        return <Typography>ไม่พบข้อมูลผู้ใช้</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 3, minHeight: '100vh' }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#ffffff', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                sx={{ width: 120, height: 120, mb: 2 }}
                                alt={user.username}
                                src="/path/to/your/image.jpg"
                            />
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                {user.first_name} {user.last_name}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
                                {user.role === 1 ? 'Administrator' : 'User'}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary }}>
                                <strong>อีเมล:</strong> {user.email}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary }}>
                                <strong>โทรศัพท์:</strong> {user.tel}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary }}>
                                <strong>ชื่อผู้ใช้:</strong> {user.username}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;