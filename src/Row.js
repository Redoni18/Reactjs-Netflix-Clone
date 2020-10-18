import React, { useEffect, useState } from 'react'
import axios from './axios'
import "./Row.css";
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const base_url = "https://images.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    // code which runs based on a specific condition

    useEffect(() => {
        // the code that runs when the page loads
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]) //condition

    console.log(movies)

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error))
        }
    }

    return (
        <div className="row">

            {/* title */}
            <h2>{title}</h2>

            <div className="row__posters">
                {/* container => posters */}
                {/* several row posters */}

                {movies.map(movie => (
                    <img 
                    onClick={() => handleClick(movie)}
                    key={movie.id}
                    src={`${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`} 
                    alt={movie.name}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     />
                ))}

            </div>
            {trailerUrl &&<Youtube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row
