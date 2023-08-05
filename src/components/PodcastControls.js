import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const PodcastControls = ({ podcast, type }) => {
    const { removePodcastFromWatchlater } = useContext(GlobalContext)
    // if it's on the watchlist page, show the x button
    return (
        <div className="inner-card-controls">
            {type === 'watchlater' && (
                <>
                <button className="button-x"
                    onClick={() => removePodcastFromWatchlater(podcast.id)}>
                    x
                </button>
                </>
            )}
        </div>
    )
}