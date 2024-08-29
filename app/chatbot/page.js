'use client'

import ChatBot from "../components/ChatBot";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, Typography, Container } from "@mui/material";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div>Loading...</div>;

    return (
        <Box>
            <ResponsiveAppBar/>
            <div>User: {user?.email}</div>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}
            >
                <Typography variant="h4" gutterBottom sx={{ mt: 10 }}>
                    Welcome!
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Ask HealthAI a question to begin.
                </Typography>
                <ChatBot />
            </Box>
            <Box sx={{ bgcolor: "grey", color: "grey", py: 6, mt: 5 }}>
                <Container maxWidth="lg">
                <Typography variant="h6" color={'red'} align="center"gutterBottom>
                    HealthAI
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color="white"
                    component="p"
                >
                    Made with &#60;3 by M.Mian
                </Typography>
                </Container>
            </Box>
        </Box>
    );
}
