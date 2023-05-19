import { useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import backgroundImage from "../../assets/images/dog-at-beach.jpg";
import logoImg from "../../assets/images/marker-icon.png"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowRedirectModal, login } from "../../store/auth";


const theme = createTheme();

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", name: "" });
  const { isAuthenticated, redirectModalVisible, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    dispatch(login(formData))
      .then(() => {
        dispatch(setShowRedirectModal(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  }, [isAuthenticated,navigate]);

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
          position: "relative",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
              display: {
                xs: "none", // Hide on mobile view
                sm: "block", // Show on larger screens
              },
        }}
      >
        <img
          src={backgroundImage}
          alt="Dog at the beach"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
        />
      
      </Grid>
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
              <img src={logoImg} alt="Logo" style={{ width: "80%", height: "auto" }}/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {isAuthenticated && (
              <>
              <Typography component="p" variant="body1" color="green">
                Authentication successful! Redirecting...
              </Typography>
              <Modal
            open={redirectModalVisible} // Set the visibility of the modal
            onClose={() => setShowRedirectModal(false)} // Close the modal when user clicks outside
            aria-labelledby="redirect-modal-title"
            aria-describedby="redirect-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                width: 300,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography
                id="redirect-modal-title"
                variant="h6"
                component="h2"
                gutterBottom
              >
                Authentication Successful
              </Typography>
              <Typography
                id="redirect-modal-description"
                variant="body1"
                color="text.secondary"
              >
                You will be redirected shortly...
              </Typography>
            </Box>
          </Modal>
          </>
            )}
            {error && (
              <Typography component="p" variant="body1" color="error">
                {error}! Please make sure the name and email are correct.
              </Typography>
            )}
            
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Enter Your Name"
                type="name"
                id="name"
                autoComplete="current-name"
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
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
