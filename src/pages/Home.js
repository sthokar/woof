import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreeds } from '../store/breedSlice';
import Search from '../components/Search/Search';
import LocationMap from '../components/Search/map';
import DogList from '../components/Dogs/DogsList';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Search/>
      <DogList/>
    </div>
  );
}

export default Home;
