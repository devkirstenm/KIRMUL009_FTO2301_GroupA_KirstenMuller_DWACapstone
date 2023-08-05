import React, { useContext } from "react"; 
import {GlobalContext} from "../context/GlobalState"
import { PodcastCard } from "./PodcastCard";

export const Watchlater = () => {
  const { watchlater } = useContext(GlobalContext)

  return (
    <div>
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



