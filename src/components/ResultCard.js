import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const ResultCard = ({podcast}) => {
  // give access to:
  const { addPodcastToWatchlater, watchlater } = useContext(GlobalContext)

  // prevent podcast from being added twice
  let storedPodcast = watchlater.find(o => o.id === podcast.id)

  const watchlaterDisabled = storedPodcast ? true : false


    return (
        <div className="result-card">
            <div className="watchlater-card">   
                <img src={podcast.image} className="watchlater-image"/>
                <div className="watchlater-info">
                    <h2>{podcast.title}</h2>
                    <p>{podcast.description.split(' ').slice(0, 20).join(' ')}...</p> {/* 'split' splits description into array of individual words. 'slice 0,20' extract first 20 words from array, which we join back together. Then append with '...' */}
                    <p><span>Seasons:</span> {podcast.seasons}</p>
                    <button 
                        className="watchlater-button"
                        disabled={watchlaterDisabled} // disables podcast if it's already in the watchlist
                        onClick={() => addPodcastToWatchlater(podcast)}
                        >ADD TO WATCHLATER
                    </button>
                </div> 
            </div> 
        </div>
    )
}







