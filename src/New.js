import React, { useState, useEffect } from 'react';

function New() {
  const [dogs, setDogs] = useState([]);

 

  useEffect(() => {
    // Search for dogs when the component mounts and when the user logs in
      fetch('https://frontend-take-home-service.fetch.com/dogs/search?breeds=Dhole', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Include cookies in request
      })
      .then(response => {
        if (response.ok) {
          return response.json() // Parse response body as JSON
        } else {
          throw new Error('Search failed')
        }
      })
      .then(data => {
        setDogs(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error)
      })
    }
  , []);

  return (
    <div>
      <h1>Dogs</h1>
        </div>
  );
}

export default New;
