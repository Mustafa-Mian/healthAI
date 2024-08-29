'use client'

import Link from 'next/link';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import { CheckCircleOutline, Speed, Security } from "@mui/icons-material";

function LandingPage() {

  const features = [
    {
      icon: <CheckCircleOutline sx={{ fontSize: 40 }} />,
      title: "Personalized Health Advice",
      description: "Receive tailored health recommendations based on your unique profile and daily habits, helping you achieve your wellness goals.",
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: "Realtime Symptom Checker",
      description: "Get instant assessments for your symptoms at any time of day. Our chatbot helps you understand your health concerns and suggests next steps.",
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Security",
      description: "Secured with Firebase Authentication to keep your data safe.",
    },
  ];

  return (
    <>
      <ResponsiveAppBar/>

      <Box
        sx={{
          backgroundImage: "url('assets/medical.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: 15,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" color='#36454F' sx={{ fontWeight: "bold", mb: 2 }}>
            Health Advice, On Demand
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }} color='#008F9B'>
            Chat with an AI Assistant to get realtime answers.
          </Typography>
          <Link href={'/login'}>
            <Button variant="contained" color="success" size="large">
              Learn More
            </Button>
          </Link>
        </Container>
      </Box>

      <Container sx={{ py: 10 }} maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Your Health, Our Priority.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 3 }}>
        {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{ p: 3, textAlign: "center", height: "100%" }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 56,
                    height: 56,
                    mb: 2,
                    margin: "auto",
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "grey", color: "grey", py: 6 }}>
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
    </>
  );
}

export default LandingPage;
