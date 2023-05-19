import React, { useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useDispatch } from "react-redux";
import { handleSearch } from "../../store/searchSlice";
import classes from './CitySearch.module.css';

const CitySearch = ({ selectedState, onChange, isLocationEmptyError }) => {
  const dispatch = useDispatch();

  const loadOptionsCity = useCallback(async (search, loadedOptions, page) => {
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
  }, [dispatch, selectedState]);

  const handleChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <AsyncPaginate
    className={`${isLocationEmptyError ? classes.error : ""}`}
      debounceTimeout={200}
      loadOptions={loadOptionsCity}
      onChange={handleChange}
      placeholder="Search by City or State"
      keepSelectedInList={true}
    />
  );
};

export default CitySearch;
