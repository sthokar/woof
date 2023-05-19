import { AsyncPaginate } from "react-select-async-paginate";
import { useDispatch, useSelector } from "react-redux";

const AsyncPaginateComponent = ({
  placeholder,
  loadOptions,
  value,
  onChange,
  additional,
  isPaginated = true,
  hasMore = true,
  cacheUniqs = [],
  debounceTimeout = 10,
  keepSelectedInList = true,
  ...otherProps
}) => {
  const dispatch = useDispatch();

  const handleOnChange = (newValue) => {
    loadOptions(newValue, null, 1);
    onChange(newValue);
  };

  return (
    <AsyncPaginate
      placeholder={placeholder}
      debounceTimeout={debounceTimeout}
      value={value}
      onChange={handleOnChange}
      loadOptions={(inputValue, loadedOptions) =>
        loadOptions(inputValue, loadedOptions, { page: 1 })
      }
      additional={additional}
      isPaginated={isPaginated}
      hasMore={hasMore}
      cacheUniqs={cacheUniqs}
      keepSelectedInList={keepSelectedInList}
      {...otherProps}
    />
  );
};

export default AsyncPaginateComponent;
