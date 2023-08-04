import React from "react";

export const PodcastControls = ({ podcast, type }) => {
    // if it's on the watchlist page, show the x button
    return (
        <div className="inner-card-controls">
            {type === 'watchlater' && (
                <>
                <button className="ctrl-btn">
                    x
                </button>
                </>
            )}
        </div>
    )
}