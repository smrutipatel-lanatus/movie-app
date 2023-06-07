
import axios from 'axios';
import { Container } from './Navbar';
import TrailerTvShow from '../trailers/TrailerTvShow';
import React, { Fragment, useEffect, useState, useContext } from 'react';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import '../styles/videos.css';

function TvShows() {
  const api_key = "fe08e3609a49d5c756a4242590009089";
  const Images = "https://image.tmdb.org/t/p/w500/";
  const { toggle, inputValue } = useContext(Container);
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState('');
  const input = inputValue;
  const api_url = input ? `https://api.themoviedb.org/3/search/tv?query=${input}&api_key=${api_key}` : "https://api.themoviedb.org/3/discover/tv";
  console.log('input',api_url);
  const TvShowsCall = async () => {
    const data = await axios.get(api_url, {
      params: {
        api_key: api_key,
      },
      headers: {
        Authorization: ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTA4ZTM2MDlhNDlkNWM3NTZhNDI0MjU5MDAwOTA4OSIsInN1YiI6IjY0Nzk3MDlmMTc0OTczMDBjMTMxN2U5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A2ucDRHAecGgdun_6hG0Or_FDInresMHg3sp9vDBx7A',
        'Content-Type': 'application/json',
      },
    })
    const results = data.data.results;
    setShowData(data.data.results);
    console.log(data.data.results)
    // console.log(showData);
  }
  useEffect(() => {
    setTimeout(() => {
      TvShowsCall();
    }, 100);
  }, [title]);
  const TvShowTitle = (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className='movies-container'>
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div id={trailer ? "container" : 'NoContainer'} >
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => TvShowTitle(shows)} />
                  <img src={shows.poster_path ? `${Images}${shows.poster_path}` : ``} alt='' onClick={() => TvShowTitle(shows)} />
                  <h3 id={shows.name.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{shows.name}</h3>
                </div>
              </Fragment>
            )
          })}
          {trailer ? console.log('title,',title):  <TrailerTvShow tvShowsTitle={title} /> }
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color="#fff" cursor={"pointer"} onClick={() => setTrailer(true)} />
        </div></div>
    </Fragment>
  )
}

export default TvShows;