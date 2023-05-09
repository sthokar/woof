import { Form, useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import backgroundImage from "../../assets/images/dog-at-beach.jpg";

const theme = createTheme();

export default function Auth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      name: data.get('name'),
    });
    const authData = {
      email: data.get('email'),
      name: data.get('name'),
    };
  
    const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include cookies in request
      body: JSON.stringify(authData)
    })
    .then(response => {
      if (response.ok) {
        // Login successful, set state to indicate that we're logged in
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error('Login failed')
      }
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {isAuthenticated && (
              <Typography component="p" variant="body1" color="green">
                Authentication successful! Redirecting...
              </Typography>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Enter Your Name"
                type="name"
                id="name"
                autoComplete="current-name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
