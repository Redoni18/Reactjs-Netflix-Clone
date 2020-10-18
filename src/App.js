import React from 'react';
import './App.css';
import Row from './Row'
import requests from './requests'
import Banner from './Banner'
import Nav from './Nav'

function App() {
  return (
    <div className="App">
      
      {/* navbar */}
      <Nav />

      {/* banner */}
      {/* {this is where i left off} */}
      <Banner />

      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Docymentary" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
