import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user_id = localStorage.getItem('user_id'); 

        if (!user_id) {
            setError('ไม่พบข้อมูลผู้ใช้');
            setLoading(false);
            return;
        }

        // ดึงข้อมูลผู้ใช้จาก API
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
        return <Typography>กำลังโหลด...</Typography>;
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
                    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                sx={{ width: 120, height: 120, mb: 2, backgroundColor: '#3f51b5' }}
                                alt={user.username}
                                src="/path/to/your/image.jpg" 
                            />
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333333' }}>
                                {user.first_name} {user.last_name}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#666666' }}>
                                {user.role === 1 ? 'Administrator' : 'User'} {/* ปรับตาม role_id */}
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" sx={{ mb: 1, color: '#444444' }}>
                                <strong>อีเมล:</strong> {user.email}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1, color: '#444444' }}>
                                <strong>โทรศัพท์:</strong> {user.tel}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1, color: '#444444' }}>
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