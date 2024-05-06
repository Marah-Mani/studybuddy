import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import Header from '../components/layout/Header';
import { Typography } from '@mui/material';

function Home() {
    return (
        <>
            <Header />
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: "2rem", sm: "3rem" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "93vh",
                    width: "100%",
                }}
            >
                Welcome to Study Buddy
            </Typography>
        </>
    )
}

export default Home;
