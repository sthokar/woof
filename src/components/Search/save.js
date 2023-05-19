import { useMemo, useState, useCallback, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  searchDogs,
  handleNextClick,
  handlePrevClick,
  fetchLocations,
  handleSearch
} from "../../store/searchSlice";
import DogList from "../Dogs/DogsList";
import { ShowChart } from "@mui/icons-material";
import LocationMap from "./map";
import SearchForm from "../../pages/City";

const Search = ({ onSearchChange }) => {
  const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

  const [search, setSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogs, setDogs] = useState([]);
  const breeds = useSelector((state) => state.breeds.breeds);
  const showNext = useSelector((state) => state.search.showNext);
  const showPrev = useSelector((state) => state.search.showPrev);
  const [isLoading, setIsLoading] = useState(false);
  const doggies = useSelector((state) => state.search.dogDetails);

  const location = doggies.map((data) => data.zip_code);

  const dispatch = useDispatch();
  useEffect(() => {
    if (location.length > 0) {
      dispatch(fetchLocations(location));
    }
  }, [dispatch, location]);

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

  const handleSearchButton = (city) => {
    dispatch(handleSearch(city));
  };

  const handleOnChange = useCallback((searchData) => {
    setSearch(searchData);
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (search) {
      dispatch(searchDogs(search.value, currentPage));
    }
  };

  const handleNext = async () => {
    if (showNext) {
      setIsLoading(true);

      dispatch(handleNextClick());
      setCurrentPage(currentPage + 1);

      setIsLoading(false);
    }
  };

  const handlePrev = async () => {
    if (showPrev) {
      setIsLoading(true);

      dispatch(handlePrevClick());
      setCurrentPage(currentPage - 1);

      setIsLoading(false);
    }
  };

  const [results, setResults] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const loadOptionsCity = async (search, loadedOptions, page) => {
    if (!search) {
      return {
        options: [],
        hasMore: false,
      };
    }
    try {
      const response = await dispatch(handleSearch(search));
      const options = response.payload.results.map((location) => ({
        value: location.zip_code,
        label: location.city

      }));
  
      return {
        options,
        hasMore: response.hasMore,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };
  
  const handleChange = (newValue) => {
    loadOptions(newValue, null, 1);
    setSelectedOption(newValue);

  };
  

  const handleSelect = (option) => {
    setSelectedOption(option);
    // Pass selected option to parent component
  };

  return (
    <div>

      <AsyncPaginate
        placeholder="Search for breed"
        debounceTimeout={10}
        value={search}
        onChange={handleOnChange}
        loadOptions={(inputValue, loadedOptions) =>
          loadOptions(inputValue, loadedOptions, { page: currentPage })
        }
        additional={{
          page: 1,
        }}
        isPaginated
        hasMore
      />
      <AsyncPaginate
      debounceTimeout={200}
      value={selectedOption}
      loadOptions={loadOptionsCity}
      onChange={handleSelect}
      onInputChange={handleChange}
      placeholder="Search by City or State"
      keepSelectedInList={true}
    />

      {showPrev && <button onClick={handlePrev}>Previous</button>}

      {showNext && <button onClick={handleNext}>Next</button>}
      
      <button onClick={handleOnSubmit}>Submit</button>
      <DogList isLoading={isLoading} />
      {results.map((result) => (
        <div key={result.zip_code}>
          <p>{result.city}, {result.state}</p>
          <p>Latitude: {result.latitude}</p>
          <p>Longitude: {result.longitude}</p>
        </div>
      ))}
      <LocationMap/>
    </div>
  );
};
export default Search;
