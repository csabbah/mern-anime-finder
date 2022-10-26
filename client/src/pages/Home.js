import React, { useState, useEffect } from "react";

// import Auth from "../utils/auth";

const Home = () => {
  // // Check if user is logged in
  // let loggedIn = Auth.loggedIn();
  // console.log(`User is logged in: ${loggedIn}`);

  // // If user is logged in, return their auth data (Their username, email and ID)
  // let userData = Auth.getProfile();
  // console.log("User data:", userData);

  const [data, setData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState([false, null]);

  const searchAnime = () => {
    setShowMore([false, null]);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ffae5646afmshec63d61fbd07b2fp17ee73jsn3371d91d22c0",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    fetch(
      `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchTerm}&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="search-controls">
        <input
          className="inputData"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Demon Slayer, MHA..."
        ></input>
        <div className="control-inner">
          <button onClick={() => searchAnime()}>Submit</button>
          <button
            onClick={() => {
              setData("");
              document.querySelector(".inputData").value = "";
              setShowMore([false, null]);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <ul className="main-wrapper">
        {data
          ? data.data.map((item, i) => {
              return (
                <li
                  className={`card ${
                    showMore[1] == i && showMore[0] ? "showDesc" : ""
                  }`}
                  key={i}
                >
                  <img className="image" src={item.image}></img>
                  <div className="card-wrapper">
                    <h5>{item.alternativeTitles[0].slice(0, 25)}...</h5>
                    <div className="genre-wrapper">
                      {item.genres.map((genre, i) => {
                        return (
                          <p className={`genre-item ${genre}`} key={i}>
                            {genre}
                          </p>
                        );
                      })}
                      <p>
                        {item.synopsis.slice(
                          0,
                          showMore[1] == i && showMore[0] ? 350 : 50
                        )}
                        ...
                        <span
                          className="showMoreEl"
                          onClick={() =>
                            showMore[1] == i && showMore[0]
                              ? setShowMore([false, i])
                              : setShowMore([true, i])
                          }
                        >
                          {showMore[1] == i && showMore[0]
                            ? "Show Less"
                            : "Show More"}
                        </span>
                      </p>
                    </div>
                    <a href={item.link}>Full Info</a>
                  </div>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default Home;
