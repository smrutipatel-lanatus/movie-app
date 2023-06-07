import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieData from "./MovieData";
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function MoviesData() {
  const [showData, setShowData] = useState([]);
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const api_key = "fe08e3609a49d5c756a4242590009089";
  const Images = "https://image.tmdb.org/t/p/w500/";
  const api_url = `https://api.themoviedb.org/3/discover/movie`;
  console.log("input", api_url);
  const dataCall = async () => {
    const data = await axios.get(api_url, {
      params: {
        api_key: api_key,
      },
      headers: {
        Authorization:
          " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTA4ZTM2MDlhNDlkNWM3NTZhNDI0MjU5MDAwOTA4OSIsInN1YiI6IjY0Nzk3MDlmMTc0OTczMDBjMTMxN2U5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A2ucDRHAecGgdun_6hG0Or_FDInresMHg3sp9vDBx7A",
        "Content-Type": "application/json",
      },
    });
    const results = data.data.results;
    setShowData(data.data.results);
    console.log(data.data.results);
    // console.log(showData);
  };
  useEffect(() => {
    setTimeout(() => {
      dataCall();
    }, 100);
  }, []);

  const [showModal, setShowModal] = useState(false);
  return (
    <>

      <Button variant="btn btn-outline-info text-light" onClick={() => setShowModal(true)}>
        Change Data
      </Button>

      <Modal className="dark-modal" dialogClassName="modal-xl" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton >
          <Modal.Title>Movies Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table>
        <thead>
          <tr>
            <th scope="col" className="col-2">Movie ID</th>
            <th scope="col" className="col-4">Name</th>
            <th scope="col" className="col-2">Release Date</th>
            <th scope="col" className="col-2">Average Vote</th>
            <th scope="col" className="col-2">Popularity</th>
          </tr>
        </thead>
        <tbody>
          {showData.map((movie, index) => (
            
              <MovieData
              key={movie.id}
              movie={movie}
              index={index}
              show={show}
              setShow={(bool) => setShow(bool)}
              setShowData={setShowData}
              showData={showData}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              />
              ))}
        </tbody>
      </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default MoviesData;
