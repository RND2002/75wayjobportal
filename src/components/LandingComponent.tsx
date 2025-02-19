// LandingContent.tsx
import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url('/assets/hero-background.jpg')", // Replace with your own image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "50vh", md: "70vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {/* Optional overlay for better text contrast */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1, px: 2 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Explore thousands of opportunities to build a fulfilling career.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate("/employers")}
              >
                For Employers
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose 75wayJob Portal?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h5" sx={{ mb: 1 }}>
                Wide Range of Jobs
              </Typography>
              <Typography variant="body1">
                Access thousands of opportunities across multiple sectors.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h5" sx={{ mb: 1 }}>
                Easy Application
              </Typography>
              <Typography variant="body1">
                Apply with a single click and manage your applications effortlessly.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h5" sx={{ mb: 1 }}>
                Career Resources
              </Typography>
              <Typography variant="body1">
                Benefit from expert resume tips, interview coaching, and more.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#f5f5f5", py: 4 }}>
        <Container>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} 75wayJob Portal. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default LandingContent;
