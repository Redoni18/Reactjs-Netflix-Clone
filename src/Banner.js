import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

function Banner() {

    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
            return request;
            //request.data.results[Math.floor(Math.random() * request.data.results.length - 1) gets a random movie from the beggining
            // of the list all the way till the end
        }
        fetchData();
    }, [])
    console.log(movie)


    //truncate function shton nje "..." pas nje numri te caktum te fjaleve 
    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

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
        <div>
        <header className="banner" 
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner_buttons">
                    <button onClick={() => handleClick(movie)} className="banner__button">Play</button>
                    <button className="banner__button">My list</button>

                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom"></div>
            
        </header>
        {trailerUrl &&<Youtube videoId={trailerUrl} opts={opts} />}
        </div>

    )
}

export default Banner
