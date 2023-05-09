export const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const handleNextClick = async (nextEndpoint, setDogs, setNextEndpoint, setPrevEndpoint, setShowNext) => {
  if (nextEndpoint) {
    const response = await fetch(`${API_BASE_URL}${nextEndpoint}`, {
      credentials: "include",
    });
    const data = await response.json();
    console.log("next", data);
    setDogs((prevDogs) => [...prevDogs, ...data.resultIds]);
    setNextEndpoint(data.next);
    setPrevEndpoint(data.prev);
    if (!data.next) {
      setShowNext(false);
    }
  }
};
