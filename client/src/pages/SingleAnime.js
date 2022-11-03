import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleAnime = () => {
  let { param } = useParams();

  const [data, setData] = useState("");
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ffae5646afmshec63d61fbd07b2fp17ee73jsn3371d91d22c0",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    fetch(`https://anime-db.p.rapidapi.com/anime/by-id/${param}`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="single-anime-wrapper">
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      {data ? (
        <div className="single-inner-wrapper">
          <Nav.Link className="back-btn" as={Link} to="/">
            Back
          </Nav.Link>
          <img src={data.image} alt={data.title}></img>
          <h1>{data.title}</h1>
          <div className="group-data">
            <p>Status: {data.status}</p>
            <p>Total Episodes: {data.episodes}</p>
            <p>Ranking: #{data.ranking}</p>
          </div>
          <p>
            Genres:
            <span className="single-line">
              {data.genres.map((genre, i) => (
                <span className={`genre-item ${genre}`} key={i}>
                  {genre}
                </span>
              ))}
            </span>
          </p>
          <p style={{ marginBottom: "0px" }}>Synopsis:</p>
          <p className="single-synopsis">{data.synopsis}</p>
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            View Full source
          </a>
        </div>
      ) : (
        <p style={{ color: "white" }}>Loading...</p>
      )}
    </div>
  );
};

export default SingleAnime;
