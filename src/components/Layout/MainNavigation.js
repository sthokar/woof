import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Badge } from '@mui/material';
import logoImg from '../../assets/images/marker-icon.png';
import Box from "@mui/material/Box";


import { logout,setShowLogoutModal } from '../../store/auth';
import Modal from "@mui/material/Modal";


function MainNavigation() {
  const navigate = useNavigate();
  const favoriteDogs = useSelector((state) => state.favoriteDogs.dogs);
  const dispatch = useDispatch();
  const loggingOutModalVisible = useSelector((state) => state.auth.loggingOutModalVisible); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);// New selector


  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1500);       
      })
      .catch((error) => {
        // Handle any error that occurs during logout
        console.log(error);
      });
  };
  const closeModal = () => {
    dispatch(setShowLogoutModal(false));
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        <img src={logoImg} alt="Logo" style={{ marginRight: '10px', height: '30px' }} />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WOOF
        </Typography>
        <Button component={NavLink} to="/home" exact activeClassName="active" color="inherit">
          Home
        </Button>
        <Button component={NavLink} to="/find-dog" activeClassName="active" color="inherit">
          About
        </Button>
        <Button onClick={handleFavoritesClick} color="inherit">
          <Badge badgeContent={favoriteDogs.length} color="error">
            <FavoriteIcon />
          </Badge>
        </Button>
        {!true && (
          <Button component={NavLink} to="/auth?mode=login" activeClassName="active" color="inherit">
            Authentication
          </Button>
        )}
        {isAuthenticated && (
          <Button component="a" onClick={handleLogout} color="inherit">
            Logout
          </Button>
        )}
        {loggingOutModalVisible && ( // New conditional rendering for the modal
        <Modal open={loggingOutModalVisible} onClose={closeModal}>
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
           Logging out...
          </Typography>
         
        </Box>
          </Modal>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
