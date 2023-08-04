import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  
  // search bar
  const [query, setQuery] = useState("") // initial state is an empty string
  
  // store the API results here:
  const [results, setResults] = useState([]) // return an array of results; initial result will be an empty array

  // fetch data
  const onChange = (e) => {
    e.preventDefault()
    const searchTerm = e.target.value; // query (text) will update with every values (key stroke) typed in
    setQuery(searchTerm);
    
    // every time something is typed, it will send a fetch request to the API to display a list of matching podcasts
    fetch("https://podcast-api.netlify.app/shows")
    .then((res) => res.json())
    .then((data) =>
    // set 'results' state:
    setResults(
      !data.errors // if no errors from API (aka: if there is matching podcast to search query)...
        ? data.filter( // ...then show that filtered data
            (podcast) =>
              // searches for matching results from title & description (case-insensitive)
              podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              podcast.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        // otherwise set it to an empty array (no )
        : [] 
    )
    );
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a podcast by title or description"
              value={query} // set to the state
              onChange={onChange} // tell the component what to do when we change the value
            />
          </div>

          <div>
            {results.map((podcast) => ( // parameter 'podcast' represents each item in the array during each iteration of the .map function (see README.md for more of an explanation)
                <div key={podcast.id}>
                  <ResultCard podcast={podcast} />
                </div> 
            ))}
            </div>

        </div>
      </div>
    </div>
  );
};






