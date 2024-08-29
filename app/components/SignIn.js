'use client'

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('Log in successful! You will now be redirected to the chatbot.')
          router.push('/chatbot');
        } catch (error) {
          console.error('Login failed:', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}
        >
            <Box
                sx={{
                    width: 500,
                    height: 500,
                    bgcolor: '#FFFFFF',
                    color: 'white',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid Black'
                }}
            >
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color={'Black'}>
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs color={'Black'}>
                        Don&apos;t have an account?
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                        {"Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
                </Container>
            </Box>
        </Box>
        </ThemeProvider>
    );
}