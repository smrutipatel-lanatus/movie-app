import axios from "axios";
import { Container } from "./Navbar";
import TrailerMovie from "../trailers/TrailerMovie";
import MoviesData from "./MoviesData";

import React, { Fragment, useEffect, useState, useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import "../styles/videos.css";
import "../styles/card.css";

const Images = "https://image.tmdb.org/t/p/w500/";
const api_key = "fe08e3609a49d5c756a4242590009089";
function Movies() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [moviesData, setMoviesData] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [trailer, setTrailer] = useState(true);
  // const inp = changeInput ? `https://api.themoviedb.org/3/${changeInput}/movie` :`https://api.themoviedb.org/3/discover/movie`;
  const api_url = input
    ? `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${api_key}`
    : "https://api.themoviedb.org/3/discover/movie";
  console.log("input", api_url);
  const MovieCall = async () => {
    const data = await axios.get(api_url, {
      params: {
        api_key: api_key,
        query: input,
      },
      headers: {
        Authorization:
          " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTA4ZTM2MDlhNDlkNWM3NTZhNDI0MjU5MDAwOTA4OSIsInN1YiI6IjY0Nzk3MDlmMTc0OTczMDBjMTMxN2U5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A2ucDRHAecGgdun_6hG0Or_FDInresMHg3sp9vDBx7A",
        "Content-Type": "application/json",
      },
    });
    // const url = `${api_url}/discover/movie/api_key=${api_key}`;
    // const data = await fetch(url);
    // const responseJson = await data.json();
    const results = data.data.results;
    console.log("movies-data", data.data.results);
    setMoviesData(data.data.results);
  };
  useEffect(() => {
    setTimeout(() => {
      MovieCall();
    }, 100);
  }, [input]);
  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(!trailer);
  };
  const movieTitleHandler = (movieTitle) => {
    console.log(movieTitle);
  };
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="container">

          <div className="row pt-5 text-end">
            <div className="col">
              <MoviesData />
            </div>
          </div>
        </div>
        <div className="movies-container">
          {moviesData.map((movie) => {
            return (
              <Fragment key={movie.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="#fff"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => MoviesTitle(movie)}
                  />

                  <img
                    src={
                      movie.poster_path ? `${Images}${movie.poster_path}` : ``
                    }
                    alt=""
                    onClick={() => MoviesTitle(movie)}
                  />
                  <h3
                    id={movie.title.length > 28 ? "smaller-Text" : ""}
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? (
            console.log(movieTitle)
          ) : (
            <TrailerMovie moviesTitle={movieTitle} toggle={toggle} />
          )}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
            fontSize={55}
            color="#fff"
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Movies;
