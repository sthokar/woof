import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreeds } from '../store/breedSlice';
import Search from '../components/Search/Search';
import LocationMap from '../components/Search/map';
import DogList from '../components/Dogs/DogsList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import heroImg from '../assets/images/p.jpg';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const dogList = useSelector((state) => state.search.dogs);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchBreeds())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginTop: '50px' }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <div>
      <Search />
      {dogList.length === 0 ? (
       <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '65vh',
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }}
        >
          <Typography variant="h3" component="h3" sx={{ marginBottom: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Find your best friend!
          </Typography>
          <Typography variant="p" component="p" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }} >
            We have a wide variety of dogs available for adoption. Use the search above to find your perfect match.
          </Typography>
        </Box>
      ) : (
        <DogList />
      )}
    </div>
  );
}

export default Home;
