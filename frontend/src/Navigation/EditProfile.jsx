import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProfileEditPage = () => {
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

    const formik = useFormik({
        initialValues: {
            username: user?.username || '',
            email: user?.email || '',
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            tel: user?.tel || '',
            avatar: null,
        },
        validationSchema: Yup.object({
            username: Yup.string().required('จำเป็นต้องกรอก'),
            email: Yup.string().email('อีเมลไม่ถูกต้อง').required('จำเป็นต้องกรอก'),
            first_name: Yup.string().required('จำเป็นต้องกรอก'),
            last_name: Yup.string().required('จำเป็นต้องกรอก'),
            tel: Yup.string().matches(/^[0-9]{10}$/, 'เบอร์โทรศัพท์ไม่ถูกต้อง').required('จำเป็นต้องกรอก'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('tel', values.tel);
            if (values.avatar) {
                formData.append('avatar', values.avatar);
            }

            try {
                const response = await fetch(`http://localhost:5000/user/${user.user_id}`, {
                    method: 'PUT',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้');
                }

                const result = await response.json();
                alert('อัปเดตข้อมูลสำเร็จ');
                setUser(result.user); // อัปเดตข้อมูลผู้ใช้ใน state
            } catch (error) {
                setError(error.message);
            }
        },
    });

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
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                            แก้ไขโปรไฟล์
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                <Avatar
                                    sx={{ width: 120, height: 120, mb: 2 }}
                                    src={formik.values.avatar ? URL.createObjectURL(formik.values.avatar) : user.avatar}
                                />
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="avatar-upload"
                                    type="file"
                                    onChange={(event) => {
                                        formik.setFieldValue('avatar', event.currentTarget.files[0]);
                                    }}
                                />
                                <label htmlFor="avatar-upload">
                                    <Button variant="contained" component="span" sx={{
                                    color: "#ffffff",
                                    backgroundColor: "#38b000",
                                    "&:hover": { backgroundColor: "#2c8c00" },
                                }}>
                                        อัปโหลดรูปภาพ
                                    </Button>
                                </label>
                            </Box>
                            <TextField
                                fullWidth
                                label="ชื่อผู้ใช้"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="อีเมล"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="ชื่อ"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && formik.errors.first_name}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="นามสกุล"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="เบอร์โทรศัพท์"
                                name="tel"
                                value={formik.values.tel}
                                onChange={formik.handleChange}
                                error={formik.touched.tel && Boolean(formik.errors.tel)}
                                helperText={formik.touched.tel && formik.errors.tel}
                                sx={{ mb: 2 }}
                            />
                            <Button type="submit" variant="contained" fullWidth sx={{
                                    color: "#ffffff",
                                    backgroundColor: "#38b000",
                                    "&:hover": { backgroundColor: "#2c8c00" },
                                }}>
                                บันทึกการเปลี่ยนแปลง
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileEditPage;