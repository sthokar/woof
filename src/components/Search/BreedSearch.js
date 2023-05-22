import React, { useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useDispatch, useSelector } from "react-redux";
import { searchDogs, handleNextClick, handlePrevClick } from "../../store/searchSlice";
import classes from './BreedSearch.module.css';
import { Search } from "@mui/icons-material";

const BreedSearch = ({ currentPage, handleOnChange,  handleOnSubmit, isBreedValid }) => {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds.breeds);
 
  const [isLoading, setIsLoading] = useState(false);

  const loadOptions = useCallback(
    async (inputValue, loadedOptions, { page }) => {
      const filteredBreeds = breeds.filter((breed) =>
        breed.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      const start = (page - 1) * 25;
      const end = page * 25;

      const options = filteredBreeds
        .slice(start, end)
        .map((breed) => ({ label: breed, value: breed }));

      return {
        options,
        hasMore: filteredBreeds.length > end,
        additional: {
          page: page + 1,
        },
      };
    },
    [breeds]
  );


  

  return (
    <div className={classes.searchContainer} >
      <AsyncPaginate
        className={`${classes.searchBar} ${isBreedValid ? "" : classes.error}`}
        placeholder="Search for breed"
        debounceTimeout={10}
        onChange={handleOnChange}
        loadOptions={(inputValue, loadedOptions) =>
          loadOptions(inputValue, loadedOptions, { page: currentPage })
        }
        additional={{
          page: currentPage,
        }}
        isPaginated
        hasMore
      />
<div className= {classes.buttonContainer}>
     
      <form onSubmit={handleOnSubmit}>
      <button type="submit" className={classes.searchButton}>           <Search />
      </button>
    </form>  </div>  </div>
  );
};

export default BreedSearch;
