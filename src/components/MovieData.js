import React, { useState } from "react";
import { Button } from "react-bootstrap";

function MovieData({ movie, setShowData, showData, index }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const [editedValues, setEditedValues] = useState([]);
  const handleEdit = (index) => {
    setEditIndex(index);
  };
  const handleInputChange = (e, index) => {
    const updatedData = [...showData];
    updatedData[index][e.target.name] = e.target.value;
    console.log(index);
    setShowData(updatedData);
    setEditedData(updatedData);
  };
  const handleSave = (index) => {
    const updatedData = showData.map((movie, i) => {
        if (i === index) {
          return { ...movie, ...editedData[index] };
        } else {
          return movie;
        }
      }); 

    // const updatedData = [...showData];
    // updatedData[index] = editedData[index];
    setShowData(updatedData);
    setEditIndex(null);
  };
  return (
    <>
      <tr key={movie.id}>
        {/* <th scope="row">1</th> */}
        <td>{editIndex === index ? (
            <input
              type="text"
              name="id"
              value={editedData[index]?.id || movie.id}
              onChange={(e) => {
                const updatedValues = [...editedData];
                updatedValues[index] = {
                  ...updatedValues[index],
                  id: e.target.value,
                };
                setEditedData(updatedValues);
              }}
            />
          ) : (
            movie.id
          )}</td>
        <td>
          {editIndex === index ? (
            <input
              type="text"
              name="title"
              value={editedData[index]?.title || movie.title}
              onChange={(e) => {
                const updatedValues = [...editedData];
                updatedValues[index] = {
                  ...updatedValues[index],
                  title: e.target.value,
                };
                setEditedData(updatedValues);
              }}
            />
          ) : (
            movie.title
          )}
        </td>
        <td> {editIndex === index ? (
             <input
              type="text"
              name="release_date"
              value={editedData[index]?.release_date || movie.release_date}
              onChange={(e) => {
                const updatedValues = [...editedData];
                updatedValues[index] = {
                  ...updatedValues[index],
                  release_date: e.target.value,
                };
                setEditedData(updatedValues);
              }}
              />
            ) : (
                movie.release_date
              )}</td>
        <td>{editIndex === index ? ( 
        <input
              type="text"
              name="vote_average"
              value={editedData[index]?.vote_average || movie.vote_average}
              onChange={(e) => {
                const updatedValues = [...editedData];
                updatedValues[index] = {
                  ...updatedValues[index],
                  vote_average: e.target.value,
                };
                setEditedData(updatedValues);
              }}
            />) : (
                movie.vote_average
              )}</td>
        <td>{editIndex === index ? ( 
        <input
              type="text"
              name="popularity"
              value={editedData[index]?.popularity || movie.popularity}
              onChange={(e) => {
                const updatedValues = [...editedData];
                updatedValues[index] = {
                  ...updatedValues[index],
                  popularity: e.target.value,
                };
                setEditedData(updatedValues);
              }}
            /> ) : (
                movie.popularity
              )}</td>
        <td>
          <td>
            {editIndex === index ? (
              <Button variant="secondary" onClick={() => handleSave(index)}>
                Save
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => handleEdit(index)}>
                Edit
              </Button>
            )}
            
          </td>
        </td>
      </tr>
    </>
  );
}
export default MovieData;
