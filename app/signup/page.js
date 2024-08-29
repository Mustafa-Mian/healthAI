'use client';

import SignUp from '../components/SignUp';
import { Box } from '@mui/material';
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Home() {
  return (
    <Box>
      <ResponsiveAppBar/>
      <SignUp />
    </Box>
  );
}
