'use client';

import SignIn from '../components/SignIn';
import { Box } from '@mui/material';
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Home() {
  return (
    <Box>
      <ResponsiveAppBar/>
      <SignIn />
    </Box>
  );
}
