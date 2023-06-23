import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultImage from "../img/default_img.png";

const baseURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = '307fd0a82be6c313814e4ab1e538e172';
const imgBaseURL = "https://image.tmdb.org/t/p/w500";


function SingleMovie() {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [genre_ids, setGenreIds] = useState([]);
    
  async function fetchData() {
    axios.get(baseURL + id, {
      params: {
        api_key: apiKey,
      }
    })
      .then(response => {
        // console.log(response.data);
        setMovie(response.data);
        setGenreIds(response.data.genres);
      })
      .catch(error => {
        setError(error.message);
      })
  }

  useEffect( () => {
    fetchData()
    // eslint-disable-next-line
  }, []);

  if (error) {
    return (<div className="error"> <h2>{ error }</h2></div>)
  } else if (movie) {
    const items = genre_ids.map(genre => genre.name).join(" / ").toString();
      let genres = items;
      return (
        <div className="single-movie">
          {/* <img src={imgBaseURL + movie.poster_path} alt="movie_image"/> */}
          <img
          src={movie.poster_path ? imgBaseURL + movie.poster_path : defaultImage}
          alt={movie.title}
          onError={(e) => {
            e.target.src = defaultImage; // Fallback to default image if the poster image fails to load
          }}
        />
          <div className="about_single_movie">
            <h2 className="title">{movie.title}</h2>
            <h4> { genres } </h4>
            <h5> Date of release: { movie.release_date } </h5>
            <p className="movie_about">{movie.overview}</p>
            <span>Movie budget: {Math.round(movie.budget)/100000} millons dollars</span>
            <h3> Movie rating: { movie.vote_average } </h3>
          </div>
        </div>
      )
  }
}

export default SingleMovie;