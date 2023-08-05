import React from "react"
import { format } from 'date-fns'; // automatically formats date and time in correct format
import ImageSlider from "./ImageSlider";
// image slider

export default function Main() {

  // State 1: displays homepage of previews
  const [allPodcastsView, setAllPodcastsView] = React.useState([])

  // fetching podcast data from api
  React.useEffect(() => { // to manage side effects issues (code that affects an outside system)
      // callback function:
      fetch("https://podcast-api.netlify.app/shows") // fetch request to the previews of all the shows
          .then(res => res.json()) // fetch receives a response in json, converts to a js object so we can access its properties (id, image etc.)
          // then it takes the data and updates "allPodcastsView"
          .then(data => setAllPodcastsView(data))
  // need to provide 2nd parameter (dependencies array) to React.useEffect, to stop the rerender issue
  }, []) // empty []: means i want this callback function to run once, & there's no dependencies [] to watch to trigger it to run again
  // NOTE: if you do need it to run again: watch this https://scrimba.com/learn/learnreact/useeffect-dependencies-array-co4fc423992f2d9737eaa55f2 & https://scrimba.com/learn/learnreact/useeffect-for-fetching-data-cof924a3f92d4ca7648780a8d


  // State 2: when user clicks on a specific podcast
  const [selectedPodcast, setSelectedPodcast] = React.useState(null); // the initial value of selectedPodcast should be set to null instead of undefined, since it will be updated with an object (the data fetched from the API) later on.
  
  // function for when a user click son a specific podcast (using error handling):
  // it takes 'id' as input
  const handlePodcastSelection = async (id) => {
      // try and catch handle errors that might happen during fetching podcast data, so that if something goes wrong the whole app won't crash
      try {
        // Fetch the data for the selected podcast using the provided ID
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        // converts to json object
        const data = await response.json();
        // console.log to check if data is fetched correctly
        console.log("Fetched data:", data);
        // updates 'selectedPodcast'
        setSelectedPodcast(data);
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching podcast:', error);
      }
    };
    
  // genre ids and their titles
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
  };

  const slides = [
    { url: "http://localhost:3000/even-the-rich.jpg"},
    { url: "http://localhost:3000/this-is-actually-happening.jpg"},
    { url: "http://localhost:3000/american-history-tellers.jpg"}
  ]
  
  // return statements:
  return (
      <main className="inner-container">
        <div className="recommendations">
          <h1 className="recommendations--title" >Trending Now</h1>
          <div className="image-slider">
            <ImageSlider slides={slides} />
          </div>
          {/* sorting options */}
          <form className="sorting--options">
              <label htmlFor="sorting">Sort by:</label>
              <br />
              <select id="sorting">
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="genre">Genre</option>
                  <option value="date-newest-first">Data: Newest first</option>
                  <option value="date-oldest-first">Date: Oldest first</option>
              </select>
          </form>
          </div>

          {/* display all podcasts */}
          <div className="podcast-previews">
          {allPodcastsView.map(podcast => ( // parameter 'podcast' represents each item in the array during each iteration of the .map function (see README.md for more of an explanation)
              <div key={podcast.id} className="podcast-preview">
                  <div className="preview--image">
                      <img src={podcast.image} className="podcast--image" />  
                  </div >   
                  <div className="preview--text">     
                      <h2>{podcast.title}</h2> 
                      <p className="preview-description">{podcast.description.split(' ').slice(0, 15).join(' ')}...</p> {/* 'split' splits description into array of individual words. 'slice 0,20' extract first 20 words from array, which we join back together. Then append with '...' */}
                      <p><span className="preview--bold--text">Seasons:</span> {podcast.seasons}</p>
                      <p className="preview-genre"><span className="preview--bold--text">Genres:</span> {podcast.genres.map(genreId => genreMapping[genreId]).join(', ')}</p>
                      <p><span className="preview--bold--text">Updated:</span> {format(new Date(podcast.updated), "d MMMM yyyy, HH:mm a")}</p>
                  </div> 
                  {/* SELECT PODCAST BUTTON */}
                  <button
                      className="open-preview-button"
                      onClick={() => handlePodcastSelection(podcast.id)}
                      >
                        See more
                  </button>                  
              </div> 
          ))}
          </div>

          {/* display selected podcast (if selectedPodcast is truthy, display the following..)*/}
          {selectedPodcast && (
              <div className={`modal--overlay ${selectedPodcast ? '' : 'hidden'}`}>
                  <div className="modal--content">
                      <p className="podcast--title">{selectedPodcast.title}</p>
                      <img src={selectedPodcast.image} className="selected--podcast--image" />
                      <p className="podcast--description">{selectedPodcast.description}</p>

                      {/* Display the seasons */}
                      <div>
                          <h3 className="podcast--seasons--title">Seasons:</h3>
                          {selectedPodcast.seasons.map(season => (
                              <div> 
                                  <div className="podcast--seasons--season" key={season.season}></div>
                                  <p>{season.title}</p>
                                  <img src={season.image} className="selected--podcast--season--image"/>

                                      {/* Display the episodes*/}
                                      <div>
                                          <h4 className="podcast--episodes--title">Episodes:</h4>
                                          {season.episodes.map(episode => ( // for each episode, return...
                                              <div key={episode.episode}>
                                                  <p>{`Episode ${episode.episode}: ${episode.title}`}</p>
                                                  <p>{episode.description}</p>
                                                  <p>{episode.file}</p>
                                              </div>
                                          ))}
                                      </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
              )}
      
          <footer className="footer">
          <h1> © 2023 devkirstenm development. All rights reserved.</h1>
          </footer>
      </main>
  )
}

