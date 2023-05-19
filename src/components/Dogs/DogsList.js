import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import classes from './DogsList.module.css'



import LocationMap from '../Search/map';
import { addFavoriteDog , removeFavoriteDog} from '../../store/favoriteSlice';
import { ClassNames } from '@emotion/react';

function DogCard(props) {
  const { img, name, age, breed, zip_code, id } = props;
  const [favorited, setFavorited] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    // Dispatch the data of the selected DogCard to the store
    if(!favorited){
    dispatch(addFavoriteDog({ id, img, name, age, breed, zip_code}));
    setFavorited(!favorited);

    }
    else{
    // Toggle the favorited state
    dispatch(removeFavoriteDog({id}))
    setFavorited(!favorited);
    }
  };


  return (
    <Card className={classes.dogCard} style={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.cardMediaDog} 
          image={img}
          title={name}
        />
        <IconButton onClick={handleClick}>
        <FavoriteIcon color={favorited ? 'error' : 'disabled'} /><Typography variant="body2" color="textSecondary" component="p">
        Pick Me
      </Typography>
      </IconButton>
        <CardContent>
          <Typography className={classes.dogName} gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Age: {age}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Breed: {breed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Zip Code: {zip_code}
          </Typography>
         
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function DogList({ isLoading }) {
    
    const dogs = useSelector((state) => state.search.dogDetails);
    console.log("dogs",dogs);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!dogs || !dogs.length) {
      return null;
    }
  
    return (
      <div className={classes.dogListContainer}>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            id={dog.id}
            img={dog.img}
            name={dog.name}
            age={dog.age}
            breed={dog.breed}
            zip_code={dog.zip_code}
            className={classes.dog}
          />
        ))}
      </div>
    );
  }
  

export default DogList;
