import { Card, Box, CardActions, CardContent, Button, Typography } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Noto Sans Thai',
            'sans-serif',
        ].join(','),
    },
});
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function Calculate() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: "'Noto Sans Thai', sans-serif",
                },
            }}
        >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>

                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </ConfigProvider>
    );
}

export default Calculate;
