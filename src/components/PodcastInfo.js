import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";

const PodcastInfo = () => {
  const { id } = useParams(); // getting the podcast ID from the URL parameter
  console.log(id)

  const [selectedPodcast, setSelectedPodcast] = useState(null); // the initial value of selectedPodcast should be set to null instead of undefined, since it will be updated with an object (the data fetched from the API) later on.

  const [selectedEpisodeFile, playEpisode] = useState(null); // 

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
        .then((response) => response.json())
        .then((data) => setSelectedPodcast(data))
        .catch((error) => {
            console.error("Error fetching podcast:", error);
            setSelectedPodcast(null); // Set selectedPodcast to null in case of an error
        });
    }, [id]);

     // state to keep track of the expanded state for each season
    const [expandedSeasons, setExpandedSeasons] = useState({});

    // function to toggle the expanded state for a season
    const toggleSeasonExpansion = (season) => {
        setExpandedSeasons((prevExpandedSeasons) => ({
        ...prevExpandedSeasons,
        [season]: !prevExpandedSeasons[season]
        }));
    };
  
    if (!selectedPodcast) {
        return <div>Loading...</div>;
    }
    
    
  return (
    <div className="container">
      <div className="podcast-info-container">
        <h2 className="podcast-title">{selectedPodcast.title}</h2>
        <p className="podcast-description">{selectedPodcast.description}</p>
        <div>
          <h3 className="season-title">Select a season to view episodes:</h3>
          {selectedPodcast.seasons.map((season) => (
            <div className="season-container" key={season.season}>
              <p
                className="season-info"
                onClick={() => toggleSeasonExpansion(season.season)}
              >
                {`Season ${season.season}: ${season.title} (${season.episodes.length} episodes)`}
              </p>
              <img
                src={season.image}
                className="season-image"
                alt={`Season ${season.season} image`}
              />
              {expandedSeasons[season.season] && (
                <div>
                  <h4 className="episode-title">Episodes:</h4>
                  {season.episodes.map((episode) => (
                    <div className="episode-container" key={episode.episode}>
                      <p className="episode-info">{`Episode ${episode.episode}: ${episode.title}`}</p>
                      <p className="episode-description">{episode.description}</p>
                      <button className="episode-file" onClick={() => playEpisode(episode.file)}>Play episode</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedEpisodeFile && <AudioPlayer episodeFile={selectedEpisodeFile} />}
    </div>
  );
};

export default PodcastInfo;