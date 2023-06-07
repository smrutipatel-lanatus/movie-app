
import axios from 'axios';
import { Container } from './Navbar';
import React, { Fragment, useEffect, useState, useContext } from 'react';
import TrailerTrending from '../trailers/TrailerTrending';
import { AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai';
import '../styles/videos.css';

const Images = "https://image.tmdb.org/t/p/w500/";
const api_key = "fe08e3609a49d5c756a4242590009089";
  function Trends() {
  const { toggle,inputValue } = useContext(Container);
  const input = inputValue;
  const [trendsData, setTrendsData] = useState([]);
  const [trendsTitle, setTrendsTitle] = useState('');
  const [trendsName, setTrendsName] = useState('');
  const [trailer, setTrailer] = useState(true);
  const api_url = `https://api.themoviedb.org/3`;
  const trendsShown = `/trending/all/week`;
  const TrendsCall = async () => {
    const data = await axios.get(`${api_url}${trendsShown}`, {
      params: {
        api_key: api_key,
        query: input,
      },
      headers: {
        Authorization: ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTA4ZTM2MDlhNDlkNWM3NTZhNDI0MjU5MDAwOTA4OSIsInN1YiI6IjY0Nzk3MDlmMTc0OTczMDBjMTMxN2U5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A2ucDRHAecGgdun_6hG0Or_FDInresMHg3sp9vDBx7A',
        'Content-Type': 'application/json',
      },
    })
    // const url = `${api_url}/discover/movie/api_key=${api_key}`;
    // const data = await fetch(url);
    // const responseJson = await data.json();
    const results = data.data.results;
    setTrendsData(results);
    console.log('trending-data',results);
  }
  useEffect(() => {
    setTimeout(() => {
      TrendsCall();
    }, 100);
  }, [input]);
  const TrendsTitle = (trend) =>{
    setTrendsTitle(trend.title);
    setTrendsName(trend.name);
    setTrailer(!trailer);
  }
  return (
<Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className='movies-container'>
          {trendsData.map((trend) => {
            return (
              <Fragment key={trend.id}>
                <div id={trailer?"container":'NoContainer'} >
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => TrendsTitle(trend)}/>
                  <img src={trend.poster_path ? `${Images}${trend.poster_path}` : ``} alt='' onClick={() => TrendsTitle(trend)}/>
                  <h3 id={trend.title ? 'smaller-Text':''} className={toggle? 'mainColor':'secondaryColor'}>{trend.title ? trend.title : trend.name}</h3>
                </div>
              </Fragment>
            )
          })}
          {trailer ? console.log(trendsTitle):  <TrailerTrending trendsparam={!trendsTitle ? trendsName  : trendsTitle} /> }
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color="#fff" cursor={"pointer"} onClick={() => setTrailer(true)} />
        </div>
      </div>
    </Fragment>
  )
}

export default Trends;