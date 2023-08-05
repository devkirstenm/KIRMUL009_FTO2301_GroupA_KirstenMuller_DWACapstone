import React, { useContext } from "react"; 
import {GlobalContext} from "../context/GlobalState"
import { PodcastCard } from "./PodcastCard";

export const Watchlater = () => {
  const { watchlater } = useContext(GlobalContext)

  const [selectedOption, setSelectedOption] = React.useState("a-z");

  const handleSortingChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const sortPodcasts = () => {
    switch (selectedOption) { // Use selectedOption instead of option
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

  return (
    <div className="container">
      <div>
        {/* sorting options */}
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
      </div>

      {watchlater.length > 0 ? (
        <div className="podcast-previews">
        {watchlater.map((podcast) => ( // parameter 'podcast' represents each item in the array during each iteration of the .map function (see README.md for more of an explanation)
          <PodcastCard podcast={podcast} type="watchlater"/>
        ))}
    </div>
      ) : (
        <h2>No Podcasts added yet</h2>
      )}
      
    </div>
  );
};



