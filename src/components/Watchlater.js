import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { PodcastCard } from "./PodcastCard";

export const Watchlater = () => {
  const { watchlater } = useContext(GlobalContext);
  
  // State for the selected sorting option
  const [selectedOption, setSelectedOption] = useState("a-z");

  // Function to handle sorting option change
  const handleSortingChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Function to sort podcasts based on the selected option
  const sortPodcasts = (option) => {
    switch (option) {
      case "a-z":
        return [...watchlater].sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return [...watchlater].sort((a, b) => b.title.localeCompare(a.title));
      case "date-newest-first":
        return [...watchlater].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case "date-oldest-first":
        return [...watchlater].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return watchlater;
    }
  };

  // Get sorted podcasts based on the selected option
  const sortedPodcasts = sortPodcasts(selectedOption);

  return (
    <div className="container">
      {/* Sorting options */}
      <form className="sorting--options">
        <label htmlFor="sorting">Sort by:</label>
        <br />
        <select id="sorting" value={selectedOption} onChange={handleSortingChange}>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="date-newest-first">Data: Newest first</option>
          <option value="date-oldest-first">Date: Oldest first</option>
        </select>
      </form>

      {/* Display podcasts */}
      <div className="podcast-previews">
        {sortedPodcasts.length > 0 ? (
          sortedPodcasts.map((podcast, index) => (
            <PodcastCard key={index} podcast={podcast} type="watchlater" />
          ))
        ) : (
          <h2>No Podcasts added yet</h2>
        )}
      </div>
    </div>
  );
};
