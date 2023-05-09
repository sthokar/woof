import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "../store/searchSlice";
import { AsyncPaginate } from "react-select-async-paginate";

function SearchForm(props) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const loadOptions = async (search, loadedOptions, page) => {
    if (!search) {
        return {
          options: [],
          hasMore: false,
        };
      }
    try {
      const response = await dispatch(handleSearch(search));
      const options = response.payload.results.map((location) => ({
        value: location.city,
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
    console.log("newValue",newValue)
    console.log("selectedOption",selectedOption)

    if(newValue !== selectedOption) {
    setSelectedOption(newValue);
    }
    loadOptions(newValue, null, 1);

  };
  

  const handleSelect = (option) => {
    setSelectedOption(option);
    // Pass selected option to parent component
    props.onSubmit(option.value);
  };

  return (
    <AsyncPaginate
      debounceTimeout={200}
      value={selectedOption}
      loadOptions={loadOptions}
      onChange={handleSelect}
      onInputChange={handleChange}
      placeholder="Search by City or State"
      keepSelectedInList={true}
    />
  );
}

export default SearchForm;
