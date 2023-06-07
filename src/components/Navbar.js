import React, { useState, Fragment } from "react";
import { HiSearch } from "react-icons/hi";
import "../styles/navbar.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Movies from "./Movies";
import Trending from "./Trends";
import TvShows from "./TvShows";
import MoviesData from "./MoviesData";
// import EditData from "./EditData";

export const Container = React.createContext();
function Navbar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  return (
    <Container.Provider value={{ toggle, inputValue}}>
      <Fragment>
        <nav className={toggle ? "" : "navBarColor"}>
          <div className="nav-options">
            <NavLink to="">
              <h1 id={toggle ? "" : "heading"}>MOVIEFLIX</h1>
            </NavLink>
            <NavLink
              to=""
              style={({ isActive }) => {
                return { color: isActive ? "#fff" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>Movies</span>
            </NavLink>
            <NavLink
              to="TvShows"
              style={({ isActive }) => {
                return { color: isActive ? "#fff" : "#EE9B00" };
              }}
            >
              <span  id={toggle ? "Movies" : "MoviesLight"}>Tv Shows</span>
            </NavLink>
            <NavLink
              to="Trending"
              style={({ isActive }) => {
                return { color: isActive ? "#fff" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>Trending</span>
            </NavLink>
          </div>
          <div className="input-groups">
            <input
              type="text"
              placeholder="Type to Search.."
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <HiSearch fontSize={21} color="green" id="search" />
            <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
          <Route path="Trending" element={<Trending />} />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default Navbar;
