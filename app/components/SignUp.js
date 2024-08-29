import * as React from 'react';
import { Alert, Box, Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(null)
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setFailed(null)
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('Sign up success! You will now be redirected to login.')
          router.push('/login');
        } catch (error) {
          console.error('Login failed:', error);
          setFailed(true)
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
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Container>
                {failed && (
                    <Alert severity="error">Signup failed. Please check the email input.</Alert>
                )}
            </Box>
        </Box>
    </ThemeProvider>
  );
}