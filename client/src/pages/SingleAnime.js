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
      <div>
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
            {data.synopsis.length == 0 ? (
              <p>No Synopsis found</p>
            ) : (
              <>
                {" "}
                <p style={{ marginBottom: "0px" }}>Synopsis:</p>
                <p className="single-synopsis">{data.synopsis}</p>
              </>
            )}

            <a href={data.link} target="_blank" rel="noopener noreferrer">
              View Full source
            </a>
          </div>
        ) : (
          <p style={{ color: "white" }}>Loading...</p>
        )}
      </div>
      <div className="single-secondary-inner-wrapper">
        <h3 style={{ marginBottom: "20px" }}>You May also like</h3>
        <div className="secondary-card-wrapper">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <img style={{ width: "75px" }} src={data.thumb}></img>
            <div style={{ marginLeft: "10px" }}>
              <p style={{ marginBottom: "7px" }}>Title of Anime</p>
              <p style={{ marginBottom: "7px" }}>Other Info</p>
              <p style={{ marginBottom: "7px" }}>Link to page</p>
            </div>
          </div>
          <hr></hr>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
              borderRadius: "10px",
            }}
          >
            <img style={{ width: "75px" }} src={data.thumb}></img>
            <div style={{ marginLeft: "10px" }}>
              <p style={{ marginBottom: "7px" }}>Title of Anime</p>
              <p style={{ marginBottom: "7px" }}>Other Info</p>
              <p style={{ marginBottom: "7px" }}>Link to page</p>
            </div>
          </div>
          <hr></hr>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
              borderRadius: "10px",
            }}
          >
            <img style={{ width: "75px" }} src={data.thumb}></img>
            <div style={{ marginLeft: "10px" }}>
              <p style={{ marginBottom: "7px" }}>Title of Anime</p>
              <p style={{ marginBottom: "7px" }}>Other Info</p>
              <p style={{ marginBottom: "7px" }}>Link to page</p>
            </div>
          </div>
          <hr></hr>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
              borderRadius: "10px",
            }}
          >
            <img style={{ width: "75px" }} src={data.thumb}></img>
            <div style={{ marginLeft: "10px" }}>
              <p style={{ marginBottom: "7px" }}>Title of Anime</p>
              <p style={{ marginBottom: "7px" }}>Link to page</p>
              <p style={{ marginBottom: "7px" }}>Link to page</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAnime;
