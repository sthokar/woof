import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';

import {
  searchDogs,
  fetchLocations,
} from "../../store/searchSlice";
import DogList from "../Dogs/DogsList";
import LocationMap from "./map";
import CitySearch from "./CitySearch";
import BreedSearch from "./BreedSearch";
import StateSearch from "./StateSearch";
import SearchResults from "./SearchResults";
import { Button, Drawer, Modal, Box ,IconButton} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import classes from './Search.module.css'




const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const doggies = useSelector((state) => state.search.dogDetails);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [results, setResults] = useState([]);
  const [isResultsAvailable, setIsResultsAvailable] = useState(false);
  const [isLocationEmptyError, setIsLocationEmptyError] = useState(false);
  const [isBreedValid, setIsBreedValid] = useState(true); // Track breed input validity

  const [isFilterByLocationOpen, setIsFilterByLocationOpen] = useState(false);
  const dispatch = useDispatch();

  const handleStateChange = useCallback((selectedOption) => {
    setSelectedState(selectedOption);
    dispatch(fetchLocations({ states: [selectedOption] }));
  }, [dispatch]);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleOnChange = useCallback((searchData) => {
    setSearch(searchData);
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (search) {
      const breeds = dispatch(searchDogs(search.value, sortOrder, selectedOption));
      if(breeds) {
        setIsResultsAvailable(true); 
      }
      setIsBreedValid(true); // Reset breed validity state
    } else {
      setIsBreedValid(false); // Set breed validity state to false if it is empty
    }
   // Check for location search error
  const isLocationEmpty = isFilterByLocationOpen && (!selectedState || !selectedOption);
  setIsLocationEmptyError(isLocationEmpty);
    
  };

  useEffect(() => {
    const location = doggies.map((data) => data.zip_code);
    if (location.length > 0) {
      dispatch(fetchLocations(location)).then((response) => {
        const responseData = Array.isArray(response) ? response : [];
        setResults(responseData);
      });
    }
  }, [dispatch, doggies]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleFilterByLocationClick = () => {
    setIsFilterByLocationOpen(!isFilterByLocationOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className = {classes.searchContainer}>
      <div className = {classes.breedSearch}>
     

      <BreedSearch
      
        currentPage={currentPage}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        isBreedValid={isBreedValid}
      />
      {isBreedValid ? null : (
        <p className={classes.errorMessage}>*Please enter a breed</p>
      )}
      <div className={classes.filterButtonContainer}> 
      <IconButton
        onClick={handleFilterByLocationClick}
        className={classes.filterButton}
        sx={{
          borderRadius: "4px",
          width: "200px",
          fontSize:"16px",
           height:"40px",
           marginRight: "20px",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
        }}
      >
        <p>Add Location</p>
        {isFilterByLocationOpen ? <ExpandLess /> : <ExpandMore />}

      </IconButton>
      <label htmlFor="sort-order">Sort Order:</label>
      <select
        id="sort-order"
        value={sortOrder}
        onChange={handleSortOrderChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      </div>
      

      
      {isFilterByLocationOpen && (
        <>
        <div className={classes.searchFilterContainer}>
          <StateSearch isLocationEmptyError={isLocationEmptyError} onStateChange={handleStateChange} />

          {selectedState && (
            <CitySearch isLocationEmptyError={isLocationEmptyError} selectedState={selectedState} onChange={handleSelect} />
          )}
         
        </div>
        {isLocationEmptyError && (
          <p className={classes.errorMessage}>*Please enter State and City</p>
        )}
        </>
      )}
      
      
      

      

    </div>
    {isResultsAvailable && 
      <Box
      className={classes.map}
      sx={{
        width: "200px",
        height: "200px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      }}
      onClick={handleOpenModal}
    >        <LocationMap />
      </Box>
    }

    <Modal open={isModalOpen} onClose={handleCloseModal}>
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h6" component="h6" sx={{ marginBottom: '10px' }}>
        Map
      </Typography>
    
      <LocationMap />
    </Box>
  </Modal>
  
    </div>
  );
};

export default Search;
