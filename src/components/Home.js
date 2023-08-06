import React from "react"
import { format } from 'date-fns'; // automatically formats date and time in correct format
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom"; 

export default function Main() {

  const [allPodcastsView, setAllPodcastsView] = React.useState([])

  React.useEffect(() => { // to manage side effects issues (code that affects an outside system)
      fetch("https://podcast-api.netlify.app/shows") 
          .then(res => res.json()) 
          // then it takes the data and updates "allPodcastsView"
          .then(data => setAllPodcastsView(data))
  // provide 2nd parameter (dependencies array) to React.useEffect to stop the rerender issue
  }, []) // empty [] = callback function runs once & there's no dependencies `[]` to watch to trigger it to run again
    
  const genreMapping = { 
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

  const [selectedOption, setSelectedOption] = React.useState("a-z");

  const handleSortingChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const sortPodcasts = () => {
    switch (selectedOption) { // Use selectedOption instead of option
      case "a-z":
        return [...allPodcastsView].sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return [...allPodcastsView].sort((a, b) => b.title.localeCompare(a.title));
      case "date-newest-first":
        return [...allPodcastsView].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case "date-oldest-first":
        return [...allPodcastsView].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return allPodcastsView;
    }
  };
  
  return (
      <main className="inner-container">
        <div className="recommendations">
          <h1 className="recommendations--title" >Trending Now in South Africa</h1>
          <div className="image-slider">
            <ImageSlider slides={slides} />
          </div>

            {/* sorting options */}
            <form className="sorting--options">
                <label htmlFor="sorting" className="sort-by">Sort by:</label>
                <br />
                <select id="sorting" value={selectedOption} onChange={handleSortingChange}>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="date-newest-first">Data: Newest first</option>
                    <option value="date-oldest-first">Date: Oldest first</option>
                </select>
            </form>

        </div>

          {/* display all podcasts */}
          <div className="podcast-previews">
            {sortPodcasts(selectedOption).map(podcast => (
              <div key={podcast.id} className="podcast-preview">
                  <Link to={`/podcast/${podcast.id}`}>
                    <div className="preview--image">
                    <img src={podcast.image} className="podcast--image" />  
                    </div>
                    </Link> 
                  <div className="preview--text">     
                      <h2>{podcast.title}</h2> 
                      <p className="preview-description">{podcast.description.split(' ').slice(0, 15).join(' ')}...</p> {/* 'split' splits description into array of individual words. 'slice 0,20' extract first 20 words from array, which we join back together. Then append with '...' */}
                      <p><span className="preview--bold--text">Seasons:</span> {podcast.seasons}</p>
                      <p className="preview-genre"><span className="preview--bold--text">Genres:</span> {podcast.genres.map(genreId => genreMapping[genreId]).join(', ')}</p>
                      <p><span className="preview--bold--text">Updated:</span> {format(new Date(podcast.updated), "d MMMM yyyy, HH:mm a")}</p>
                  </div>             
              </div> 
          ))}
          </div>
      
          <footer className="footer">
          <h1> © 2023 devkirstenm development. All rights reserved.</h1>
          </footer>
      </main>
  )
}

