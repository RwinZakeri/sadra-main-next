import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation'



const theme = createTheme({
    direction: 'rtl',
});

const DashboardCard = ({ icon, title, link }) => {
    const navigate = useRouter()
    const clickHandler = () => {
        navigate.push(link)
    }
    return (
        <ThemeProvider theme={theme}>
            {/* <div onClick={clickHandler}> */}
                <Card className="card" onClick={clickHandler} sx={{cursor:"pointer"}}>
                    <CardContent>
                        <IconButton color="primary" size="large">
                            {icon}
                        </IconButton>
                        <Typography fontFamily={'Yekan, sans-serif'} variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography fontFamily={'Yekan, sans-serif'} variant="body2" color="textSecondary" sx={{padding:"5px"}}>
                            برای مشاهده {title} کلیک کنید.
                        </Typography>
                    </CardContent>
                </Card>
            {/* </div> */}
        </ThemeProvider>
    );
};

export default DashboardCard;
