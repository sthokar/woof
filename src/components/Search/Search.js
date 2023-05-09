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
import DogList from "./dogs";
import { ShowChart } from "@mui/icons-material";
import LocationMap from "./map";
import SearchForm from "../../pages/City";
import states from "./states.json"
const searchStates = async (search, loadedOptions) => {
  const filteredOptions = states.filter((state) => {
    return state.name.toLowerCase().startsWith(search.toLowerCase()) || state.abbreviation.toLowerCase().startsWith(search.toLowerCase());
  });

  const options = filteredOptions.map((state) => {
    return { label: state.name, value: state.abbreviation };
  });

  return {
    options,
    hasMore: false,
  };
};

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
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedOption, setSelectedOption] = useState(null);


  const [selectedState, setSelectedState] = useState("");

  

const handleStateChange = (selectedOption) => {
  setSelectedState(selectedOption.value);
  dispatch(fetchLocations({ 'states': [selectedOption.value] }));

};

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
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleOnChange = useCallback((searchData) => {
    setSearch(searchData);
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (search) {
      dispatch(searchDogs(search.value,sortOrder,selectedOption));
    }
  };

  const handleNext = async () => {
    if (showNext) {
      setIsLoading(true);

      dispatch(handleNextClick(sortOrder));
      setCurrentPage(currentPage + 1);

      setIsLoading(false);
    }
  };

  const handlePrev = async () => {
    if (showPrev) {
      setIsLoading(true);

      dispatch(handlePrevClick(sortOrder));
      setCurrentPage(currentPage - 1);

      setIsLoading(false);
    }
  };

  const [results, setResults] = useState([]);


  const loadOptionsCity = async (search, loadedOptions, page) => {
    if (!selectedState) {
      return {
        options: [],
        hasMore: false,
      };
    }
    if (!search) {
      return {
        options: [],
        hasMore: false,
      };
    }
    try {
      const response = await dispatch(handleSearch(search));
      const options = response.payload.results
        .filter((location) => location.state === selectedState)
        .map((location) => ({
          value: location.zip_code,
          label: location.city,
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
      cacheUniqs={[selectedState]}
      loadOptions={searchStates}
      value={{ label: selectedState, value: selectedState }}
      placeholder="Enter a state or abbreviation..."
      onChange={handleStateChange}
    />
    {selectedState &&
      <AsyncPaginate
      debounceTimeout={200}
      value={selectedOption}
      loadOptions={loadOptionsCity}
      onChange={handleSelect}
      placeholder="Search by City or State"
      keepSelectedInList={true}
    />}
    <label htmlFor="sort-order">Sort Order:</label>
    <select id="sort-order" value={sortOrder} onChange={handleSortOrderChange}>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>

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
