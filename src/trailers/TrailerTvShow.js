import { useState, useEffect, Fragment } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../styles/TrailerMovies.css";

function TrailerTvShow(props, toggle) {
  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("");
  function handleSearch() {
    console.log("console in search ", props.tvShowsTitle);
    console.log("video", video);
    setVideo(props.tvShowsTitle);
    movieTrailer(video).then((response) => {
      console.log(response);
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
        <h1 id={toggle ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>{props.tvShowsTitle}</h1>
        <ReactPlayer url={videoURL} controls={true} />
      </div>
    </Fragment>
  );
}

export default TrailerTvShow;
