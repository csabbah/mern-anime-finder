import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleAnime = () => {
  let { param } = useParams();

  const [data, setData] = useState("");
  const [recoData, setRecoData] = useState("");

  useEffect(() => {
    // Execute the fetch for the current anime on page (based on endpoint param)
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ffae5646afmshec63d61fbd07b2fp17ee73jsn3371d91d22c0",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    fetch(`https://anime-db.p.rapidapi.com/anime/by-id/${param}`, options)
      .then((response) => response.json())
      .then((response) => {
        // Set the main data to the state object
        setData(response);
        // Then return random data based on the above data genre
        const randomGenre = Math.ceil(
          Math.random() * response.genres.length - 1
        );
        const options2 = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "ffae5646afmshec63d61fbd07b2fp17ee73jsn3371d91d22c0",
            "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
          },
        };
        fetch(
          `https://anime-db.p.rapidapi.com/anime?page=1&size=10&genres=${response.genres[randomGenre]}&sortBy=ranking&sortOrder=asc`,
          options2
        )
          .then((response2) => response2.json())
          .then((response2) => {
            setRecoData(response2);
          })
          .catch((err) => console.error(err));
      })
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
          <p style={{ color: "white", position: "relative", zIndex: "11" }}>
            Loading...
          </p>
        )}
      </div>

      {data && recoData == "" && (
        <p style={{ color: "white", position: "relative", zIndex: "11" }}>
          Loading recommended anime...
        </p>
      )}
      {recoData != "" && (
        <div className="single-secondary-inner-wrapper">
          <h3>You May also like:</h3>
          <div className="secondary-card-wrapper">
            {recoData.data.map((item, i) => {
              const { title, thumb, ranking, _id } = item;
              return (
                <div key={i}>
                  <div className="secondary-card">
                    <img alt={title} src={thumb}></img>
                    <div>
                      <p>{title}</p>
                      <p>Ranking: #{ranking}</p>

                      <a href={`/anime/${_id}`}>Full Data</a>
                    </div>
                  </div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAnime;
