import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  name: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = props => {
  const [newMovie, setNewMovie] = useState(initialMovie);
  console.log(props);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      setNewMovie({ ...newMovie, stars: [...newMovie.stars, value] });
    }
    setNewMovie({
      ...newMovie,
      [e.target.name]: value
    });
  };

  useEffect(() => {
    if (props.movies.length > 0) {
      const newItem = props.movies.find(
        thing => `${thing.id}` === props.match.params.id
      );
      setNewMovie(newItem);
    }
  }, [props.movies, props.match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.movies.id}`, newMovie)
      .then(res => {
        console.log("put response", res);
        props.movies.find(item => {
          if (item.id === res.data.id) {
            item.title = res.data.title;
            item.director = res.data.director;
            item.metascore = res.data.metascore;
            item.stars = res.data.stars;
          }
          return item;
        });
        props.history.push(`/`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={newMovie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={newMovie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={newMovie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={newMovie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;