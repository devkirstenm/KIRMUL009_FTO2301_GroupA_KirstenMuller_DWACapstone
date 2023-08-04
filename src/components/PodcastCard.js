// this is what will be displayed on the "Watchlater" page
import React from "react";
import { format } from 'date-fns'; // automatically formats date and time in correct format
import { PodcastControls } from "./PodcastControls";

export const PodcastCard = ({ podcast, type }) => {

    
  // genre mapping
  const genreMapping = { // genre object to map over
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family"
  }

    return (
        <div className="watchlater-page">
            <div className="podcast-previews">
                <div className="podcast-preview">
                    <div className="preview--image">
                        <img src={podcast.image} className="podcast--image" />  
                    </div >  
                    <div className="preview--text">     
                        <h2>{podcast.title}</h2>
                        <p>{podcast.description.split(' ').slice(0, 20).join(' ')}...</p> {/* 'split' splits description into array of individual words. 'slice 0,20' extract first 20 words from array, which we join back together. Then append with '...' */}
                        <p><span class="preview--bold--text">Seasons:</span> {podcast.seasons}</p>
                        <p><span class="preview--bold--text">Genres:</span> {podcast.genres.map(genreId => genreMapping[genreId]).join(', ')}</p>
                        <p><span class="preview--bold--text">Updated:</span> {format(new Date(podcast.updated), "d MMMM yyyy, HH:mm a")}</p>
                    </div> 
                </div>
            </div> 
        </div>
    )
}
