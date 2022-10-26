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
  const [buttons, setButtons] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

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
      `https://anime-db.p.rapidapi.com/anime?page=${activePage}&size=${dataPerPage}&search=${searchTerm}&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setButtons(Array.from(Array(response.meta.totalPage).keys()));
      })
      .catch((err) => console.error(err));
  };

  console.log(data);

  return (
    <div className="outer-wrapper">
      <div className="search-controls">
        <input
          className="inputData"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Demon Slayer, MHA..."
        ></input>
        <div className="control-inner">
          <button onClick={() => searchAnime()}>Submit</button>
          {data && data.data.length > 1 && (
            <>
              <button
                onClick={() => {
                  setData("");
                  document.querySelector(".inputData").value = "";
                  setShowMore([false, null]);
                }}
              >
                Clear
              </button>
              <select
                onChange={(e) => {
                  setDataPerPage(e.target.value);
                  searchAnime(activePage);
                }}
                id="dropdown"
              >
                <option value="perPage">Data per page</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>
            </>
          )}
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
                  <img
                    className="image"
                    src={item.image}
                    alt={item.alternativeTitles[0]}
                  ></img>
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
      <div className="pages-wrapper">
        {data && data.data.length > 1 && (
          <button className={`${activePage == 1 ? "activePage" : ""}`}>
            {"<"}
          </button>
        )}
        {data &&
          data.data.length > 1 &&
          buttons.map((pageNum, i) => {
            return (
              <button
                className={`${activePage == i + 1 ? "activePage" : ""}`}
                onClick={() => {
                  setActivePage(i + 1);
                  searchAnime();
                }}
                key={i + 1}
              >
                {pageNum + 1}
              </button>
            );
          })}
        {data && data.data.length > 1 && (
          <button
            className={`${activePage == buttons.length ? "activePage" : ""}`}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
