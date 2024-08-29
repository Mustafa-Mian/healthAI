// Using Example from MUI docs
import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Chat', path: '/chatbot' },
  { name: 'Login', path: '/login' }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "grey" }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ height: '64px', position: 'relative' }} >
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <img src="/assets/HealthAITransparent.png" alt="Logo" style={{ height: '50px', marginRight: '0.5rem' }} />
            <Typography variant='h5'>
              HealthAI
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link href={page.path} passHref>
                      <Button
                        textAlign="center"
                        variant="outlined"
                      >
                          {page.name}
                      </Button>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Link key={page.name} href={page.path} style={{ textDecoration: 'none' }} passHref>
                <Button
                  variant="contained"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, ml: 2, color: 'white', display: 'block' }}
                  color="success"
                >
                  {page.name}
                </Button>
              </Link>
            ))}
            {user && (
              <Button 
                color="error"
                textAlign="center"
                variant="contained"
                onClick={signOutUser}
                sx={{ my: 2, ml: 2, color: 'white', display: 'block' }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
