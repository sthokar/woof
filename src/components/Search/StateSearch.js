import React, { useEffect, useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import states from "./states.json";
import classes from './StateSearch.module.css';

const searchStates = async (search, loadedOptions) => {
  const filteredOptions = states.filter((state) => {
    return (
      state.name.toLowerCase().startsWith(search.toLowerCase()) ||
      state.abbreviation.toLowerCase().startsWith(search.toLowerCase())
    );
  });

  const options = filteredOptions.map((state) => {
    return { label: state.name, value: state.abbreviation };
  });

  return {
    options,
    hasMore: false,
  };
};

const StateSearch = ({ onStateChange, isLocationEmptyError }) => {
  const [selectedState, setSelectedState] = useState("");

  const handleStateChange = useCallback(
    (selectedOption) => {
      setSelectedState(selectedOption.value);
      onStateChange(selectedOption.value);
    },
    [onStateChange]
  );

  return (
    <AsyncPaginate
      className={`${classes.stateSearch} ${isLocationEmptyError ? classes.error : ""}`}
      cacheUniqs={[selectedState]}
      defaultOptions={[]}
      loadOptions={searchStates}
      placeholder="Enter a state"
      onChange={handleStateChange}
    />
  );
};

export default StateSearch;
