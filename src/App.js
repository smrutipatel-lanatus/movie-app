import Navbar from "./components/Navbar";
import TrailerMovie from "./trailers/TrailerMovie";
import MoviesData from "./components/MoviesData";
import { Routes, Route, NavLink } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="MovieData" element={<MoviesData />} />
      </Routes>
    </div>
  );
}

export default App;
