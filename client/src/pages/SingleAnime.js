import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const SingleAnime = () => {
  let { param } = useParams();

  const [data, setData] = useState("");
  useEffect(() => {
    console.log(true);
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
      {data && (
        <div>
          <img src={data.image} alt={data.title}></img>
          <h1>{data.title}</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <p>{data.status}</p>- Total Episodes: <p>{data.episodes}</p>
          </div>
          <p>Ranking: #{data.ranking}</p>
          <div>
            Genres:
            <span style={{ display: "flex", gap: "10px" }}>
              {data.genres.map((genre, i) => (
                <p key={i}>{genre}</p>
              ))}
            </span>
          </div>
          <p>{data.synopsis}</p>
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            View source
          </a>
        </div>
      )}
    </div>
  );
};

export default SingleAnime;
