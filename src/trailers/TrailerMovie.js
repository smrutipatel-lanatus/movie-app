import { useState, useEffect, Fragment } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../styles/TrailerMovies.css";

function TrailerMovie(props, toggle) {
  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("");
  function handleSearch() {
    setVideo(props.moviesTitle);
    movieTrailer(video).then((response) => {
      setVideoURL(response);
    });
  }
  useEffect(() => {
    handleSearch();
  }, [videoURL]);
  return (
    <Fragment>
      <div className="container"></div>
      <div className="player">
        <h1 id={toggle ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>
          {props.moviesTitle}
        </h1>
        <ReactPlayer url={videoURL} controls={true} />
      </div>
    </Fragment>
  );
}

export default TrailerMovie;
